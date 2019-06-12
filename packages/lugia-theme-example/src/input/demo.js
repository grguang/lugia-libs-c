/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Input from './';
import { getBorder } from '@lugia/theme-css-hoc/src';

export default class Demo extends React.Component<any, any> {
  render() {
    const config = {
      My_Input: {
        My_Input: {
          normal: {
            width: 1000,
          },
        },

        ResetButton: {
          normal: {
            width: 555,
          },
        },
        GrantSon: {
          normal: {
            width: 555,
          },
        },

        CSSBlock: {
          normal: {
            border: getBorder(
              { color: 'red', width: 5, style: 'solid' },
              { radius: '13%' },
            ),
            width: 25,
            position: {
              top: 25,
              right: 25,
            },
            fontSize: 30,
            background: { backgroundColor: 'yellow' },
          },
          hover: {
            background: { backgroundColor: 'white' },
          },
        },

        ThemeBlock: {
          normal: {
            background: { backgroundColor: 'blue' },
            border: getBorder({ color: 'red', style: 'solid', width: 1 }),
          },
          hover: {
            background: { backgroundColor: 'green' },
            border: 'none',
          },
        },
      },
    };
    return (
      <div style={{ fontSize: '2rem' }}>
        <Input theme={config} />
      </div>
    );
  }
}
