import React, { HTMLAttributes, ReactNode, FC } from 'react';
import PanelHeaderButton from '../PanelHeaderButton/PanelHeaderButton';
import getClassName from '../../helpers/getClassName';
import classNames from '../../lib/classNames';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import { IOS } from '../../lib/platform';
import { hasReactNode } from '../../lib/utils';
import withPlatform from '../../hoc/withPlatform';
import { HasChildren, HasPlatform } from '../../types';
import withAdaptivity, { AdaptivityProps, ViewWidth } from '../../hoc/withAdaptivity';
import Subhead from '../Typography/Subhead/Subhead';
import Title from '../Typography/Title/Title';

export interface ModalCardProps extends HTMLAttributes<HTMLElement>, HasPlatform, HasChildren, AdaptivityProps {
  /**
   * Иконка.
   *
   * Может быть компонентом иконки, например, `<Icon56MoneyTransferOutline />`, или `<Avatar size={72} src="" />`
   */
  icon?: ReactNode;

  /**
   * Заголовок карточки
   */
  header?: string;

  /**
   * Текст, поясняющий заголовок
   */
  caption?: string;

  /**
   * Кнопки-действия.
   *
   * Рекомендуется использовать `<Button size="l" mode="primary" />` или `<Button size="l" mode="secondary" />`
   */
  actions?: ReactNode;

  /**
   * Тип отображения кнопок: вертикальный или горизонтальный
   */
  actionsLayout?: 'vertical' | 'horizontal';

  /**
   * Будет вызван при закрытии карточки жестом
   */
  onClose?(): void;
}

const ModalCard: FC<ModalCardProps> = (props) => {
  const {
    icon,
    header,
    caption,
    children,
    actions,
    actionsLayout,
    onClose,
    platform,
    className,
    viewWidth,
  } = props;

  const isDesktop = viewWidth >= ViewWidth.TABLET;
  const canShowCloseBtn = platform === IOS || isDesktop;

  return (
    <div className={classNames(getClassName('ModalCard', platform), {
      'ModalCard--desktop': isDesktop,
    }, className)}>
      <div className="ModalCard__in">
        <div className="ModalCard__container">
          {hasReactNode(icon) && <div className="ModalCard__icon">{icon}</div>}
          {hasReactNode(header) && <Title level="2" weight="semibold" className="ModalCard__header">{header}</Title>}
          {hasReactNode(caption) && <Subhead weight="regular" className="ModalCard__subheader">{caption}</Subhead>}

          {children}

          {hasReactNode(actions) &&
          <div className={classNames('ModalCard__actions', {
            'ModalCard__actions--v': actionsLayout === 'vertical',
          })}>
            {actions}
          </div>
          }

          {canShowCloseBtn &&
          <PanelHeaderButton className="ModalCard__dismiss" onClick={onClose}>
            <Icon24Dismiss />
          </PanelHeaderButton>
          }
        </div>
      </div>
    </div>
  );
};

ModalCard.defaultProps = {
  actionsLayout: 'horizontal',
};

export default withAdaptivity(withPlatform(ModalCard), {
  viewWidth: true,
});
