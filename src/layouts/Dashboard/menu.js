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
			name: 'Meals',
			url: '/meals',
			index: '3'
		},
		{
			name: 'Stock',
			url: '/stock',
			index: '4'
		},
		{
			name: 'Products',
			url: '/products',
			index: '5'
		},
		{
			name: 'Profile',
			index: '6',
			children: [
				{
					name: 'View Profile',
					url: '/profile',
					index: '6-1'
				},
				{
					name: 'Edit Profile',
					url: '/profile/edit',
					index: '6-2'
				}
			]
		},
		{
			name:'Sections',
			url:'/sections',
			index:'7'

		},
		{
			name:'Vouchers',
			url:'/vouchers',
			index:'8'

		},
		{
			name:'Orders',
			url:'/orders',
			index:'9'

		}
	]
};
