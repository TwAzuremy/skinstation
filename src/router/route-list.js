const list = ['personal', 'favourites', 'warehouse', 'settings', 'about']

/**
 * 设置 name 列表, 自动生成路由
 * @returns {{path: string, component: function(): Promise<*>, name: string}[]}
 */
export function getRoutes() {
    return list.map(name => ({
        path: `/${name}`,
        name,
        component: () => import(`@/views/${name}.vue`)
    }))
}