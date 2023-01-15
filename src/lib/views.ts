import { VirtualDOM, child$ } from '@youwol/flux-view'
import { filter, take } from 'rxjs/operators'
import { PlatformState } from '@youwol/os-core'
import { Observable } from 'rxjs'

const marginTop = 5 // %
const marginBottom = 5 // %

/**
 * @category View
 */
export class TitleView implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly id = 'youwol'

    /**
     * @group Immutable DOM Constants
     */
    public readonly class =
        'w-100 h-25 d-flex flex-column justify-content-center p-3'

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            {
                tag: 'h1',
                class: 'text-center',
                innerText:
                    'Upgrade your computational science experience with YouWol',
            },
            {
                tag: 'h2',
                class: 'text-center py-2',
                innerText: 'Flexible, collaborative and powerful',
            },
        ]
    }
}

/**
 * @category View
 */
export class ParagraphView implements VirtualDOM {
    public readonly innerHTML: string
    public readonly tag = 'p'

    constructor(text: string) {
        this.innerHTML = text
    }
}

/**
 * @category View
 */
export class SectionTitleView implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly id: string

    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'text-center section-title'

    /**
     * @group Immutable DOM Constants
     */
    public readonly style = {
        marginTop: `${marginTop}%`,
        marginBottom: `${marginBottom}%`,
        fontWeight: 'bolder',
    }

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor({ title, id }: { title: string; id: string }) {
        this.id = id
        this.children = [
            {
                tag: 'h2',
                style: {
                    fontWeight: 'bolder',
                },
                innerText: title,
            },
        ]
    }
}

/**
 * @category View
 */
export class TextSectionView implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'text-justify w-50 rounded mx-5 overflow-auto'

    /**
     * @group Immutable DOM Constants
     */
    public readonly style = {
        fontSize: 'large',
        maxWidth: '100%',
    }

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor({
        paragraphs,
        nextTopic,
    }: {
        paragraphs: (string | VirtualDOM)[]
        nextTopic?: { title: string; id: string }
    }) {
        this.children = [
            {
                class: 'p-5 mx-auto rounded',
                style: {
                    maxWidth: '750px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                },
                children: paragraphs.map((paragraph: string | VirtualDOM) => {
                    return typeof paragraph == 'string'
                        ? new ParagraphView(paragraph.replace(/\n/g, ' '))
                        : paragraph
                }),
            },
            nextTopic && new NextButtonView({ nextTopic }),
        ]
    }
}

/**
 * @category View
 */
export class SectionView {
    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'h-100 w-100 d-flex align-items-center'

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor({
        paragraphs,
        platformState,
        cdnPackage,
        parameters,
        reversed,
        scrollTop$,
        titleId,
        nextTopic,
    }: {
        paragraphs: (string | VirtualDOM)[]
        platformState: PlatformState
        cdnPackage: string
        parameters: { [_k: string]: string }
        reversed: boolean
        scrollTop$: Observable<number>
        titleId: string
        nextTopic?: { title: string; id: string }
    }) {
        const children = [
            new TextSectionView({ paragraphs, nextTopic }),
            new Preview({
                platformState,
                cdnPackage,
                parameters,
                scrollTop$,
                titleId,
            }),
        ]
        reversed && children.reverse()
        this.children = children
    }
}

/**
 * @category View
 */
export class NextButtonView implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly class =
        'mx-auto p-2 border rounded fv-pointer fv-hover-xx-lighter my-3 d-flex align-items-center fv-bg-background-alt'

    /**
     * @group Immutable DOM Constants
     */
    public readonly style = {
        width: 'fit-content',
    }

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    public readonly onclick: () => void
    constructor({ nextTopic }: { nextTopic: { title: string; id: string } }) {
        this.children = [
            {
                innerText: nextTopic.title,
            },
            {
                class: 'mx-1',
            },
            {
                class: 'fas fa-angle-double-down',
            },
        ]
        this.onclick = () => {
            const target = document.getElementById(nextTopic.id)
            const container = document.getElementById('scrolling-container')
            container.scrollTo({
                top: target.offsetTop - container.getBoundingClientRect().top,
                left: 0,
                behavior: 'smooth',
            })
        }
    }
}

/**
 * @category View
 */
export class AppIcon implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly class =
        'rounded fv-pointer fv-hover-xx-lighter d-flex flex-column align-items-center mx-2'

    /**
     * @group Immutable DOM Constants
     */
    public readonly style = {
        fontSize: '0.7em',
        width: 'fit-content',
    }
    public readonly children: VirtualDOM[]

    public readonly onclick: () => void

    constructor({
        srcImg,
        title,
        platformState,
        cdnPackage,
        parameters,
        size,
    }: {
        srcImg
        title
        platformState
        cdnPackage
        parameters
        size?
    }) {
        size = size || 50
        this.children = [
            {
                tag: 'img',
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: `${size / 4}px`,
                },
                src: srcImg,
            },
            {
                tag: 'b',
                innerText: title,
            },
        ]
        this.onclick = () => {
            platformState
                .createInstance$({
                    cdnPackage,
                    version: 'latest',
                    parameters,
                    focus: true,
                })
                .subscribe()
        }
    }
}

/**
 * @category View
 */
export class Preview implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'w-50 h-100 d-flex flex-column'

    /**
     * @group Immutable DOM Constants
     */
    public readonly style = {}

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor({
        platformState,
        cdnPackage,
        parameters,
        scrollTop$,
        titleId,
    }) {
        const fullUrl = `/applications/${cdnPackage}/latest?${Object.entries(
            parameters,
        ).reduce((acc, e) => acc + e[0] + '=' + e[1] + '&', '')}`

        this.children = [
            {
                class: 'flex-grow-1 w-100',
                style: {
                    minHeight: '0px',
                },
                children: [
                    child$(
                        scrollTop$.pipe(
                            filter(() => {
                                const elem = document.getElementById(titleId)
                                return (
                                    elem &&
                                    elem.getBoundingClientRect().bottom <=
                                        window.innerHeight
                                )
                            }),
                            take(1),
                        ),
                        (): VirtualDOM => ({
                            class: 'flex-grow-1',
                            tag: 'iframe',
                            src: fullUrl,
                            width: '100%',
                            height: '100%',
                        }),
                        {
                            untilFirst: {
                                class: 'flex-grow-1',
                                width: '100%',
                                height: '100%',
                            },
                        },
                    ),
                ],
            },
            {
                class: 'mx-auto d-flex justify-content-center align-items-center my-2 rounded p-2',
                style: {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    width: 'fit-content',
                },
                children: [
                    {
                        innerText: 'Open as application',
                    },
                    {
                        class: 'fas fa-external-link-alt p-2 border rounded fv-pointer fv-hover-xx-lighter fv-bg-background-alt mx-2',
                        onclick: () => {
                            platformState
                                .createInstance$({
                                    cdnPackage,
                                    version: 'latest',
                                    parameters,
                                    focus: true,
                                })
                                .subscribe()
                        },
                    },
                ],
            },
        ]
    }
}
