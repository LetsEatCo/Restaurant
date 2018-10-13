export default {
	items: [
		{
			name: 'Dashboard',
			url: '/',
			index: '1'
		},
		{
			title: true,
			name: 'Kiosks',
			url: '/kiosks/add',
			index: '2'
		},
		{
			name: 'Colors',
			index: '3'
		},
		{
			name: 'Typography',
			url: '/theme/typography',
			index: '4'
		},
		{
			title: true,
			name: 'Components',
			index: '5'
		},
		{
			name: 'Base',
			url: '/base',
			index: '6',
			children: [
				{
					name: 'Breadcrumbs',
					url: '/base/breadcrumbs',
					index: '6-1',
				},
				{
					name: 'Cards',
					url: '/base/cards',
					index: '6-1',
				},
				{
					name: 'Carousels',
					url: '/base/carousels',
					index: '6-1',
				},
				{
					name: 'Collapses',
					url: '/base/collapses',
					index: '6-2',
				},
				{
					name: 'Forms',
					url: '/base/forms',
					index: '6-3',
				},
				{
					name: 'Jumbotrons',
					url: '/base/jumbotrons',
					index: '6-4',
				},
				{
					name: 'List Groups',
					url: '/base/list-groups',
					index: '6-5',
				},
				{
					name: 'Navs',
					url: '/base/navs',
					index: '6-6',
				},
				{
					name: 'Paginations',
					url: '/base/paginations',
					index: '6-7',
				},
				{
					name: 'Popovers',
					url: '/base/popovers',
					index: '6-8',
				},
				{
					name: 'Progress Bars',
					url: '/base/progress-bars',
					index: '6-9',
				},
				{
					name: 'Switches',
					url: '/base/switches',
					index: '6-10',
				},
				{
					name: 'Tables',
					url: '/base/tables',
					index: '6-11',
				},
				{
					name: 'Tooltips',
					url: '/base/tooltips',
					index: '6-12',
				}
			]
		},
		{
			name: 'Buttons',
			url: '/buttons',
			index: '7',
		}
	]
};
