import { VirtualDOM } from '@youwol/flux-view'
import { SectionTitleView, TitleView } from './views'
import { IntroductionView } from './introduction.view'
import { ExplorerView } from './explorer.view'
import { PythonView } from './python.view'
import { ShowRoomView } from './show-room.view'
import { PyYouwolView } from './py-youwol.view'
import { BehaviorSubject } from 'rxjs'
import { PlatformState } from '@youwol/os-core'
import { AcknowledgementsView } from './acknowledgements.view'

/**
 * @category View
 */
export class MainView implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly id = 'scrolling-container'

    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'h-100 overflow-auto'

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    /**
     * @group Immutable DOM Constants
     */
    public readonly onscroll: (ev: Event) => void

    /**
     * Observable on the actual value of the scroll top in this main view.
     *
     * @group Observables
     */
    public readonly scrollTop$ = new BehaviorSubject(0)

    constructor({ platformState }: { platformState: PlatformState }) {
        const scrollTop$ = this.scrollTop$
        this.children = [
            {
                class: 'mx-auto w-100 h-100 px-5',
                children: [
                    new PageView({
                        header: new TitleView(),
                        content: new IntroductionView({
                            platformState,
                            scrollTop$,
                            nextTopic: {
                                title: 'User-experience as usual',
                                id: 'ux',
                            },
                        }),
                    }),
                    new PageView({
                        header: new SectionTitleView({
                            title: 'User-experience as usual',
                            id: 'ux',
                        }),
                        content: new ExplorerView({
                            platformState,
                            scrollTop$,
                            titleId: 'ux',
                            nextTopic: {
                                title: 'A Polyglot Runtime',
                                id: 'polyglot',
                            },
                        }),
                    }),
                    new PageView({
                        header: new SectionTitleView({
                            title: 'A Polyglot Runtime',
                            id: 'polyglot',
                        }),
                        content: new PythonView({
                            platformState,
                            scrollTop$,
                            titleId: 'polyglot',
                            nextTopic: {
                                title: 'A Desktop Application',
                                id: 'offline',
                            },
                        }),
                    }),
                    new PageView({
                        header: new SectionTitleView({
                            title: 'A Desktop Application',
                            id: 'offline',
                        }),
                        content: new PyYouwolView({
                            platformState,
                            scrollTop$,
                            titleId: 'offline',
                            nextTopic: {
                                title: 'Show Room',
                                id: 'showroom',
                            },
                        }),
                    }),
                    new SectionTitleView({
                        title: 'Show Room',
                        id: 'showroom',
                    }),
                    new ShowRoomView({ platformState }),
                    new SectionTitleView({
                        title: 'Acknowledgments',
                        id: 'acknowledgments',
                    }),
                    new AcknowledgementsView(),
                ],
            },
        ]
        this.onscroll = (ev: MouseEvent) => {
            const target = ev.target as HTMLElement
            this.scrollTop$.next(target.scrollTop)
        }
    }
}

/**
 * @category View
 */
export class PageView implements VirtualDOM {
    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'h-100 d-flex flex-column'

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor({
        header,
        content,
    }: {
        header: VirtualDOM
        content: VirtualDOM
    }) {
        this.children = [
            header,
            {
                class: 'w-100 flex-grow-1',
                style: {
                    minHeight: '0px',
                },
                children: [content],
            },
        ]
    }
}
