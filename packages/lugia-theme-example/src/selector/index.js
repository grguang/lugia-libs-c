/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import CSSComponent from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { addMouseEvent } from '@lugia/theme-hoc';

const Block = CSSComponent({
  tag: 'span',
  className: 'selector_block',
  css: 'display: inline-block',
  normal: {
    defaultTheme: {
      width: 20,
      margin: {
        right: 20,
      },
      height: 20,
      background: { color: 'red' },
    },
  },
});

const SelectorWeb = ThemeHoc(
  class extends React.Component<any, any> {
    render() {
      const { index, count } = this.props;

      return (
        <Block
          themeProps={this.props.getPartOfThemeProps('Block', {
            selector: { index, count },
          })}
        />
      );
    }
  },
  'SelectroWEb',
);

export default ThemeHoc(
  class extends React.Component<any, any> {
    render() {
      const res = [];
      for (let i = 0; i < 10; i++) {
        let blockPart = this.props.getPartOfThemeConfig('Block');
        res.push(
          <SelectorWeb
            index={i}
            count={10}
            {...this.props.createThemeHocProps('selectWeb', {
              Block: blockPart,
            })}
            themeState={this.props.themeProps.themeState}
            disabled={this.props.disabled}
          />,
        );
      }
      return <div {...addMouseEvent(this)}>{res}</div>;
    }
  },
  'Selector',
  { hover: true, active: true },
);
