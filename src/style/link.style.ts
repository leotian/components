import {injectGlobal} from '@emotion/css';

export const resetLinkStyle = () => injectGlobal`
    a {
        text-decoration: none;
    }
`;

export const appendLinkStyle = () => injectGlobal`
    /* 装饰 */
    .panda-link {
        white-space: nowrap;
        text-decoration: none;
    
        &[disabled] {
            cursor: not-allowed;
            text-decoration: none;
        }
    
        .panda-icon-external {
            margin-left: 4px;
        }
    }
    
    .panda-link.panda-link-default,
    .panda-link.panda-link-text {
        &:hover {
            text-decoration: underline;
        }
    
        &[disabled] {
            text-decoration: none;
        }
    }
    
    /* 颜色 */
    .panda-link.panda-link-default,
    .panda-link.panda-link-text {
        &[disabled] {
            color: var(--panda-color-disabled);
        }
    }
    
    .panda-link.panda-link-default {
        color: var(--panda-color-link);
    }
    
    .panda-link.panda-link-text {
        color: var(--panda-color-text);
    }
    
    /* ant 互操作性 */
    .panda-link.panda-link-default,
    .panda-link.panda-link-text {
        .panda-tag:hover {
            text-decoration: underline;
        }
    }
`;
