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
			title: true,
			name: 'Stock',
			url: '/ingredients',
			index: '3'
		},
		{
			name: 'Profile',
			index: '4',
			children: [
				{
					name: 'View Profile',
					url: '/profile',
					index: '4-1'
				},
				{
					name: 'Edit Profile',
					url: '/profile/edit',
					index: '4-2'
				}
			]
		}
	]
};
