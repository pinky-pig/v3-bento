import type { Component } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import type { Raw } from 'vue';

declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;

declare type __VLS_NonUndefinedable_2<T> = T extends undefined ? never : T;

declare type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_Prettify_2<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

declare type __VLS_TypePropsToOption_2<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable_2<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};

declare type __VLS_WithDefaults_2<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify_2<P[K] & {
        default: D[K];
    }> : P[K];
};

export declare const Bento: DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<BentoProps>, {
maximumCells: number;
size: number;
gap: number;
disabled: boolean;
commonClass: string;
}>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
dragStart: (...args: any[]) => void;
dragEnd: (...args: any[]) => void;
}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<BentoProps>, {
maximumCells: number;
size: number;
gap: number;
disabled: boolean;
commonClass: string;
}>>> & {
onDragStart?: ((...args: any[]) => any) | undefined;
onDragEnd?: ((...args: any[]) => any) | undefined;
}, {
size: number;
maximumCells: number;
gap: number;
disabled: boolean;
commonClass: string;
}, {}>;

export declare const BentoItem: DefineComponent<__VLS_WithDefaults_2<__VLS_TypePropsToOption_2<{
id: string;
x: number;
y: number;
width?: number | undefined;
height?: number | undefined;
}>, {
width: number;
height: number;
}>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_WithDefaults_2<__VLS_TypePropsToOption_2<{
id: string;
x: number;
y: number;
width?: number | undefined;
height?: number | undefined;
}>, {
width: number;
height: number;
}>>>, {
width: number;
height: number;
}, {}>;

/**
 * JS 操作的数组类型
 */
declare interface BentoItemType {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
    components?: Raw<Component<any>>;
    [key: string]: any;
}

/**
 * 渲染的 BentoItem 组件类型
 */
declare interface BentoProps {
    bentoCells: BentoItemType[];
    size?: number;
    maximumCells?: number;
    gap?: number;
    disabled?: boolean;
    commonClass?: string;
}

export { }
