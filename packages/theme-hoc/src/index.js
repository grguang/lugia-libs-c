/**
 * 组件样式处理增强
 * @flow
 */
import type { ProviderComponent, ThemeHocOption } from '@lugia/theme-hoc';

import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  CSSComponentContainerDisplayName,
  injectThemeStateEvent,
  packDisplayName,
  ThemeContext,
  ThemeDesignHandle,
  ThemeHandle,
  hasThemeStateEvent,
} from '@lugia/theme-core';

export { addFocusBlurEvent, addMouseEvent } from '@lugia/theme-core';
let cnt = 0;

function uuid() {
  return `hoc_${cnt++}`;
}

function useInitHandle(props: Object, widgetName: string, opt: ThemeHocOption) {
  const themeConfig = useContext(ThemeContext);
  const [id] = useState(uuid());
  const [version, setVersion] = useState(0);
  const [themeState, setThemeState] = useState({});
  const svTarget = useRef({});

  let handle = useRef(null);

  if (!handle.current) {
    const initHandleObject: Object = new ThemeHandle(
      props,
      themeConfig,
      widgetName,
      themeState,
      svTarget,
    );

    if (hasThemeStateEvent(opt)) {
      initHandleObject.hover = false;
      initHandleObject.active = false;
      initHandleObject.focus = false;
    }
    handle.current = initHandleObject;
  }
  const { innerRef } = props;
  if (innerRef) {
    innerRef.current = handle.current;
  }

  let designHandle = useRef(null);
  const { innerRefForDesign } = props;
  if (innerRefForDesign && !designHandle.current) {
    designHandle.current = new ThemeDesignHandle(id);
    innerRefForDesign.current = designHandle.current;
  }
  return {
    updateVersion() {
      setVersion(version);
    },
    version,
    themeConfig,
    themeState: [themeState, setThemeState],
    handle: handle.current,
    svTarget,
  };
}

const ThemeProvider = (
  Target: ProviderComponent,
  widgetName: string,
  opt?: ThemeHocOption = { hover: false, active: false, focus: false },
): Function => {
  if (Target.displayName === CSSComponentContainerDisplayName) {
    console.warn('CSSComponent不推荐直接包括ThemeHoc');
  }

  const ThemeWrapWidget = (props: Object) => {
    const {
      handle,
      svTarget,
      updateVersion,
      themeState,
      version,
      themeConfig,
    } = useInitHandle(props, widgetName, opt);
    const { current: oldThemeConfig } = useRef({});
    useEffect(() => {
      const mouseupHandler = () => {
        if (handle.active) {
          handle.toggleActiveState(false);
        }
      };
      document.addEventListener('mouseup', mouseupHandler);
      return () => {
        document.removeEventListener('mouseup', mouseupHandler);
      };
    });
    if (
      oldThemeConfig.config !== themeConfig.config ||
      oldThemeConfig.svThemeConfigTree !== themeConfig.svThemeConfigTree
    ) {
      oldThemeConfig.config = themeConfig.config;
      oldThemeConfig.svThemeConfigTree = themeConfig.svThemeConfigTree;
      updateVersion();
    }

    if ('themeState' in props) {
      const [, setThemeState] = themeState;
      const { themeState: propsThemeState = {} } = props;
      setThemeState(propsThemeState);
    }

    if (props.innerRef) {
      props.innerRef.current = handle;
    }
    return (
      <Target
        dispatchEvent={handle.dispatchEvent}
        createEventChannel={handle.createEventChannel}
        {...props}
        {...injectThemeStateEvent(opt, handle)}
        themeProps={handle.getThemeProps()}
        getInternalThemeProps={handle.getInternalThemeProps}
        getPartOfThemeHocProps={handle.getPartOfThemeHocProps}
        getPartOfThemeConfig={handle.getPartOfThemeConfig}
        getPartOfThemeProps={handle.getPartOfThemeProps}
        createThemeHocProps={handle.createThemeHocProps}
        getTheme={handle.getTheme}
        getWidgetThemeName={() => widgetName}
        getThemeByDisplayName={handle.getThemeByDisplayName}
        svThemVersion={version}
        ref={svTarget}
      />
    );
  };
  ThemeWrapWidget.__OrginalWidget__ = Target;
  ThemeWrapWidget.displayName = packDisplayName(widgetName);
  return ThemeWrapWidget;
};
export default ThemeProvider;
