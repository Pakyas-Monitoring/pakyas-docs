// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: process.env.PUBLIC_SITE_URL || 'https://docs.pakyas.com',
	integrations: [
		mermaid(), // Must be before starlight
		starlight({
			title: 'Pakyas',
			logo: {
				src: './src/assets/pakyas-logo.svg',
			},
			editLink: {
				baseUrl: 'https://github.com/nickthecoder/pakyas/edit/main/docs/src/content/docs/',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/nickthecoder/pakyas' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{ label: 'Overview', link: '/' },
				{ label: 'Getting Started', link: '/getting-started/' },
				{
					label: 'Recipes',
					items: [
						{ label: 'Scheduled Jobs', link: '/scheduled-jobs/' },
						{ label: 'Database Backups', link: '/backups/' },
						{ label: 'Scheduled Reports', link: '/reports/' },
						{ label: 'ETL Pipelines', link: '/etl/' },
						{ label: 'Kubernetes CronJobs', link: '/kubernetes-cronjobs/' },
						{ label: 'Maintenance Tasks', link: '/maintenance/' },
					],
				},
				{
					label: 'Integrations',
					items: [
						{ label: 'Overview', link: '/integrations/' },
						{ label: 'Linux & Cron', link: '/environments/linux/' },
						{ label: 'GitHub Actions', link: '/environments/github-actions/' },
						{ label: 'GitLab CI', link: '/environments/gitlab-ci/' },
						{ label: 'Jenkins', link: '/environments/jenkins/' },
						{ label: 'CircleCI', link: '/environments/circleci/' },
						{ label: 'Docker', link: '/environments/docker/' },
						{ label: 'Kubernetes', link: '/environments/kubernetes/' },
					],
				},
				{
					label: 'Configuration',
					items: [
						{ label: 'CLI', link: '/cli/' },
						{ label: 'Environment Variables', link: '/config/env-vars/' },
						{ label: 'Terraform', link: '/config/terraform/' },
					],
				},
				{
					label: 'CLI Reference',
					items: [
						{ label: 'Installation', link: '/cli/' },
						{ label: 'monitor', link: '/cli/monitor/' },
						{ label: 'ping', link: '/cli/ping/' },
						{ label: 'update', link: '/cli/update/' },
						{ label: 'External Monitors', link: '/cli/external-monitors/' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Overview', link: '/api/' },
						{ label: 'Interactive Docs', link: 'https://api.pakyas.com/docs', attrs: { target: '_blank' } },
						{ label: 'Ping Endpoint', link: '/api/ping/' },
						{ label: 'Check Endpoints', link: '/api/checks/' },
					],
				},
				{
					label: 'Status Pages',
					items: [
						{ label: 'Overview', link: '/status-pages/' },
						{ label: 'Integrations', link: '/status-pages/integrations/' },
					],
				},
				{ label: 'Webhooks', link: '/webhooks/' },
				{ label: 'Alerts', link: '/alerts/' },
				{ label: 'Limits', link: '/limits/' },
			],
		}),
	],
});
