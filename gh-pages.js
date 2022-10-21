import { publish } from 'gh-pages';

publish('build', {
        branch: 'gh-pages',
        repo: 'https://github.com/lyghtcode/svelte-portfolio.ca.git',
        dotfiles: true,
        user: {
            name: 'Lyght Code',
            email: 'xikago.musica@gmail.com'
        }
    },
    () => { console.log('Github Page Deployed') }
);