import {useRef, useState, useCallback, useLayoutEffect, ReactNode} from 'react';
import styled from '@emotion/styled';
import {IconClose} from '../icons';
import {colors} from '../colors';
import {useAntPrefixCls} from '../utils/antPrefixClsRegion';

type OnClose = () => void;

type Type = 'info' | 'success' | 'error' | 'warning' | 'loading';

const typeMap: Record<Type, string> = {
    info: colors['info-6'],
    success: colors['success-6'],
    error: colors['error-6'],
    warning: colors['warning-6'],
    loading: colors['info-6'],
};

const MessageStaticBar = styled.div<{type: Type, duration: number}>`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => typeMap[props.type] ?? colors['info-6']};
    transform-origin: left;
    transform: scaleX(${props => (props.duration === 0 ? 0 : 1)});
`;

const MessageProgressBar = styled.div<{type: Type, duration: number}>`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => typeMap[props.type] ?? colors['info-6']};
    animation: scaleX ${props => props.duration}s linear forwards;
    transform-origin: left;

    @keyframes scaleX {
        0% {
            transform: scaleX(1);
        }

        100% {
            transform: scaleX(0);
        }
    }
`;

const StyledIconClose = styled(IconClose)`
    margin-left: 20px;
    color: ${colors['gray-8']} !important;
    cursor: pointer;
`;

const findContentContainer = (element: HTMLElement | null, antPrefixCls: string) => {
    let current: HTMLElement | null = element;
    while (current) {
        if (current.classList.contains(`${antPrefixCls}-message-notice-content`)) {
            return current;
        }
        current = current.parentElement;
    }
};

interface Props {
    type: Type;
    handlerRef: {value: () => void};
    duration?: number;
    content?: ReactNode;
    onClose?: OnClose;
    closable: boolean;
}

export const MessageContent = ({type, duration, content, handlerRef, onClose, closable}: Props) => {
    const antPrefixCls = useAntPrefixCls();
    const ref = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const setHoveringTrue = useCallback(
        () => setHovering(true),
        []
    );
    const setHoveringFalse = useCallback(
        () => setHovering(false),
        []
    );

    const handleClose = () => {
        handlerRef.value();
        onClose?.();
    };

    useLayoutEffect(
        () => {
            const maybeContainer = findContentContainer(ref.current, antPrefixCls);
            if (maybeContainer) {
                maybeContainer.addEventListener('mouseenter', setHoveringTrue);
                maybeContainer.addEventListener('mouseleave', setHoveringFalse);

                return () => {
                    maybeContainer.removeEventListener('mouseenter', setHoveringTrue);
                    maybeContainer.removeEventListener('mouseleave', setHoveringFalse);
                };
            }
        },
        [antPrefixCls, setHoveringFalse, setHoveringTrue]
    );
    return (
        <>
            {hovering
                ? <MessageStaticBar type={type} duration={duration ?? 3} />
                : <MessageProgressBar ref={ref} type={type} duration={duration ?? 3} />
            }
            {content}
            {closable && <StyledIconClose onClick={handleClose} />}
        </>
    );
};
