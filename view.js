discovery.page.define('default', {
    view: 'context',
    modifiers: {
        view: 'toggle-group',
        className: 'mode-toggle',
        name: 'mode',
        value: '=#.params.mode',
        data: [
            {
                value: 'oldschool',
                text: 'For geeks'
            },
            {
                value: 'forhumans',
                text: 'For others'
            }
        ],
        afterToggles: 'md:"Powered by [Discovery.js](https://github.com/discoveryjs/discovery)"'
    },
    content: [
        function (el, config, data, context) {
            // FIXME: workaround a bug in discovery when pageHash has wrong value on start
            if (discovery.pageHash === '#' && context.params.mode) {
                discovery.pageHash = null;
            }
            
            // FIXME: make it simpler in discovery
            discovery.setPageParams(context.mode !== 'oldschool' ? { mode: context.mode } : {}, true);
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
                            data: 'who.entries().[value ~= /^http/]',
                            item: 'badge:{ text: key, href: value, external: true }'
                        },

                        'h2:"Open Source Projects"',
                        {
                            view: 'ol',
                            className: 'projects',
                            limit: false,
                            data: 'projects',
                            item: [
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
                                    view: 'ul',
                                    data: 'satellites',
                                    whenData: true,
                                    item: [
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
                        },

                        'h2:"Talks"',
                        {
                            view: 'ol',
                            className: 'talks',
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
                            className: 'shows',
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
