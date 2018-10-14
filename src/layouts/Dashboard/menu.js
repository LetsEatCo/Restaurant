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
			name: 'Profile',
			index: '3',
			children: [
				{
					name: 'View Profile',
					url: '/profile',
					index: '3-1'
				},
				{
					name: 'Edit Profile',
					url: '/profile/edit',
					index: '3-2'
				}
			]
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
		}
	]
};
