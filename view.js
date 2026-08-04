discovery.nav.primary.append({
    name: 'github',
    href: 'https://github.com/lahmatiy/about.me',
    external: true
});

discovery.setContext({
    contactKindDict: {
        github: {
            title: 'GitHub'
        },
        linkedin: {
            title: 'LinkedIn'
        },
        twitter: {
            title: 'Twitter/X'
        },
        bluesky: {
            title: 'Bluesky'
        },
        medium: {
            title: 'Medium'
        },
        devto: {
            title: 'Dev.to'
        },
        youtube: {
            title: 'YouTube'
        },
        email: {
            title: 'Email'
        }
    }
})

discovery.page.define('default', {
    view: 'context',
    modifiers: {
        view: 'block',
        className: 'mode-toggle',
        content: {
            view: 'toggle-group',
            name: 'mode',
            value: '=#.params.mode',
            data: [
                {
                    value: 'forhumans',
                    text: 'For everyone'
                },
                {
                    value: 'forgeeks',
                    text: 'For geeks'
                }
            ],
            afterToggles: 'md:"Powered by [Discovery.js](https://github.com/discoveryjs/discovery)"'
        }
    },
    content: [
        function (el, config, data, context) {
            // FIXME: make it simpler in discovery
            discovery.setPageParams(context.mode !== 'forhumans' ? { mode: context.mode } : {}, true);
            discovery.cancelScheduledRender();
            context.params = discovery.pageParams;
        },
        {
            view: 'switch',
            content: [
                { when: '#.mode="forhumans"', content: {
                    view: 'block',
                    className: 'for-humans',
                    content: [
                        'h1:who.name',
                        'md:who.bio',
                        {
                            view: 'inline-list',
                            className: 'contacts',
                            data: 'who.contacts.entries()',
                            item: 'pill-badge:{ text: #.contactKindDict[=>$$=@.key].title, href: value, external: true }'
                        },

                        'h2:"Open Source projects"',
                        {
                            view: 'list',
                            className: 'pinned-projects',
                            limit: false,
                            data: `
                                $projects: projects | ..($ + (satellites or []));
                                pinnedProjects.($key: $; $projects[=>title=$key])
                            `,
                            item: {
                                view: 'block',
                                content: [
                                    'link:{ text: title, href: url, external: true }',
                                    {
                                        view: 'block',
                                        className: 'description',
                                        content: 'text:description'
                                    }
                                ]
                            }
                        },
                        {
                            view: 'block',
                            className: 'all-projects-link',
                            content: [
                                {
                                    view: 'button',
                                    text: '=`All ${projects | ..($ + (satellites or [])) | size()} projects`',
                                    href: "#projects"
                                }
                            ]
                        },

                        'h2:"Articles"',
                        {
                            view: 'ul',
                            className: 'articles',
                            limit: false,
                            data: 'articles',
                            item: [
                                'link:{ text: title, href: url, external: true }',
                                'text:` (${date})`'
                            ]
                        }
                    ]
                } },
                { content: {
                    view: 'struct',
                    expanded: 2,
                    limit: 12
                } }
            ]
        }
    ]
});

discovery.page.define('projects', [
    {
        view: 'block',
        className: 'projects-content',
        content: [
            'h1:"Open Source projects"',
            {
                view: 'ol',
                className: 'projects columns',
                limit: false,
                data: 'projects',
                item: [
                    {
                        view: 'block',
                        when: 'spotlight',
                        className: 'spotlight',
                        content: 'text:"★"'
                    },
                    'link:{ text: title, href: url, external: true }',
                    {
                        view: 'context',
                        when: 'role',
                        content: [
                            'badge:{ text: role, color: "#dcaf025c" }'
                        ]
                    },
                    'text:" – " + description',
                    {
                        view: 'ol',
                        data: 'satellites',
                        whenData: true,
                        item: [
                            {
                                view: 'block',
                                when: 'spotlight',
                                className: 'spotlight',
                                content: 'text:"★"'
                            },
                            'link:{ text: title, href: url, external: true }',
                            {
                                view: 'context',
                                when: 'role',
                                content: [
                                    'badge:{ text: role, color: "#dcaf025c" }'
                                ]
                            },
                            'text:" – " + description'
                        ]
                    }
                ]
            }
        ]
    },
]);

discovery.page.define('archive', [
    {
        view: 'block',
        className: 'archive-content',
        data: 'archive',
        content: [
            'h1:"Archive"',

            'h2:"Talks"',
            {
                view: 'ol',
                className: 'talks columns',
                limit: false,
                data: 'talks',
                item: [
                    {
                        view: 'switch',
                        content: [
                            { when: 'slides', content: 'link:{ text: title, href: slides, external: true }' },
                            { content: 'text:title' }
                        ]
                    },
                    'text:" "',
                    {
                        view: 'badge',
                        when: 'slides_en',
                        data: '{ text: "Slides in English", href: slides_en, external: true, color: "#dcaf025c" }'
                    },
                    {
                        view: 'badge',
                        when: 'video',
                        data: '{ text: "Video", href: video, external: true, color: "#dc02025c" }'
                    },
                    {
                        view: 'block',
                        className: 'talk-details',
                        content: 'text:`${date} / ${event} / ${location}`'
                    }
                ]
            },

            'h2:"Articles"',
            {
                view: 'ol',
                limit: false,
                data: 'articles',
                item: [
                    'link:{ text: title, href: url, external: true }',
                    'text:` (${date})`'
                ]
            },

            'h2:"Participation in podcasts"',
            {
                view: 'ol',
                className: 'shows columns',
                limit: false,
                data: 'shows',
                item: [
                    'text:title',
                    {
                        view: 'ul',
                        data: 'episodes',
                        item: [
                            {
                                view: 'switch',
                                content: [
                                    { when: 'url', content: 'link:{ text: title or num, href: url, external: true }' },
                                    { content: 'text:title or num' }
                                ]
                            },
                            {
                                view: 'inline-list',
                                when: 'media',
                                data: 'media.entries()',
                                item: 'badge:{ text: key, href: value, external: true }'
                            }
                        ]
                    }
                ]
            },

            'h2:"Event production"',
            {
                view: 'ol',
                limit: false,
                data: 'eventProduction',
                item: [
                    'link:{ text: title + (num ? " #" + num : ""), href: url, external: true }',
                    'text:` (${date}) ${location} `',
                    {
                        view: 'inline-list',
                        data: 'roles',
                        item: 'badge'
                    }
                ]
            },
        ]
    }
]);

discovery.view.define('video', (el, config, data) => {
    const { video } = typeof data === 'string' ? { video: data } : data;

    if (typeof video === 'string') {
        const videoEl = document.createElement('iframe');

        videoEl.setAttribute('width', 280);
        videoEl.setAttribute('height', 158);
        videoEl.setAttribute('src', video.replace(/^https?:\/\/youtu.be\/([^\/]+)\/?$/, 'https://www.youtube.com/embed/$1'));
        videoEl.setAttribute('frameborder', 0);
        videoEl.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        videoEl.setAttribute('allowfullscreen', '');

        el.appendChild(videoEl);
    }
});
