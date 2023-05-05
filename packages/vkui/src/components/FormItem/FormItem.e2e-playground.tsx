import * as React from 'react';
import { ComponentPlayground, type ComponentPlaygroundProps } from '@vkui-e2e/playground-helpers';
import { Cell } from '../Cell/Cell';
import { CellButton } from '../CellButton/CellButton';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import { Radio } from '../Radio/Radio';
import { RichCell } from '../RichCell/RichCell';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import { FormItem, type FormItemProps } from './FormItem';

export const FormItemPlayground = (props: ComponentPlaygroundProps) => {
  return (
    <ComponentPlayground
      {...props}
      propSets={[
        {
          top: [undefined, 'Сверху'],
          bottom: [undefined, 'Снизу'],
          removable: [undefined, true],
          children: [<Input key={0} placeholder="Введите ваше значение" />],
        },
        {
          children: [
            <CellButton key="cellbtn">CellButton</CellButton>,
            <Checkbox key="checkbox">Checkbox</Checkbox>,
            <Radio key="radio">Radio</Radio>,
            <RichCell key="rcell">RichCell</RichCell>,
            <SimpleCell key="scell">SimpleCell</SimpleCell>,
            <Cell draggable key="drag">
              Cell draggable
            </Cell>,
            <Cell draggable mode="removable" key="dragrem">
              Cell draggable removable
            </Cell>,
            <Cell draggable mode="selectable" key="dragsel">
              Cell draggable selectable
            </Cell>,
            <Cell mode="removable" key="rem">
              Cell removable
            </Cell>,
            <Cell mode="selectable" key="sel">
              Cell selectable
            </Cell>,
          ],
        },
        {
          top: ['Сверху'],
          bottom: ['Снизу'],
          removable: ['indent'],
          children: [<Input key={0} placeholder="Введите ваше значение" />],
        },
      ]}
    >
      {(props: FormItemProps) => <FormItem {...props} />}
    </ComponentPlayground>
  );
};