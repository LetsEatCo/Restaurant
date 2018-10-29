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
			name: 'Stock',
			url: '/stock',
			index: '3'
		},
		{
			name: 'Products',
			url: '/products',
			index: '4'
		},
		{
			name: 'Profile',
			index: '5',
			children: [
				{
					name: 'View Profile',
					url: '/profile',
					index: '5-1'
				},
				{
					name: 'Edit Profile',
					url: '/profile/edit',
					index: '5-2'
				}
			]
		}
	]
};
