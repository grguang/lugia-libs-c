/**
 *
 * 单个简单的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import Two from '../twolevelthoc';
import Four from '../four';
import Button from '../base/button';
import Simple from '../simple';
import { deepMerge } from '../../../../object-utils/src';

export default ThemeHoc(
  class extends React.Component<any, any> {
    render() {
      const {
        themeProps: { themeState },
      } = this.props;

      const PartB = deepMerge(
        {
          themeState,
        },
        {
          themeConfig: this.props.getPartOfThemeConfig('PartB'),
        },
      );
      const { viewClass, theme } = this.props.getPartOfThemeHocProps('ButtonB');
      const ButtonB = deepMerge(
        {
          [viewClass]: {},
        },
        theme,
      );

      const TwoC = {
        TwoC: {
          ButtonA: this.props.getPartOfThemeConfig('BButtonA'),
          ButtonB: {
            PartA: this.props.getPartOfThemeConfig('BButtonBPartA'),
          },
        },
      };
      const FourC = {
        FourC: {
          BButtonBPartA_0: this.props.getPartOfThemeConfig('FBButtonA'),
          BButtonBPartB_0: this.props.getPartOfThemeConfig('FBButtonBPartA'),
        },
      };
      return (
        <div {...addMouseEvent(this)} style={{ border: '1px solid' }}>
          three
          <Four viewClass={'FourC'} theme={FourC} />
          <Two viewClass={'TwoC'} theme={TwoC} />
          <Two {...this.props.getPartOfThemeHocProps('BigA')} />
          <Two {...this.props.getPartOfThemeHocProps('BigB')} />
        </div>
      );
    }
  },
  'Three',
  { hover: true, active: true },
);
