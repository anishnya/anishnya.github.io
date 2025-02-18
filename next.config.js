const withOffline = require('next-offline');

const nextConfig = {
	output: 'export',
	poweredByHeader: false,
	swcMinify: true,
};

module.exports = withOffline(nextConfig);

