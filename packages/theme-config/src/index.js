/**
 * 用于进行原始配置的组件
 * create by ligx
 *
 * @flow
 */
import type { ThemeConfigProps } from '@lugia/theme-config';
import { getConfig } from '@lugia/theme-core';

import * as React from 'react';
import PropTypes from 'prop-types';

type StateType = {};

class Theme extends React.Component<ThemeConfigProps, StateType> {
  static defaultProps = {
    config: {},
  };
  static displayName = 'lugia_theme_wrap';
  svThemeConfigTree: Object;

  constructor(props: ThemeConfigProps, context: Object) {
    super(props);
    this.updateTreeConfig(props, context);
  }

  componentWillReceiveProps(nextProps: ThemeConfigProps, context: Object) {
    const nowContext = this.context;
    if (
      nextProps.config !== this.props.config ||
      nowContext.config !== context.config ||
      nowContext.svThemeConfigTree !== context.svThemeConfigTree
    ) {
      this.updateTreeConfig(nextProps, context);
    }
  }

  updateTreeConfig(props: ThemeConfigProps, context: Object) {
    const { config, svThemeConfigTree } = context;
    this.svThemeConfigTree = getConfig(svThemeConfigTree, config, props.config);
  }

  getChildContext(): Object {
    const { props } = this;
    const { config } = props;
    return {
      config,
      svThemeConfigTree: this.svThemeConfigTree,
    };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

Theme.childContextTypes = {
  config: PropTypes.object,
  svThemeConfigTree: PropTypes.object,
};
Theme.contextTypes = {
  config: PropTypes.object,
  svThemeConfigTree: PropTypes.object,
};

export default Theme;
