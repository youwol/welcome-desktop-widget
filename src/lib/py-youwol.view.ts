import { SectionView } from './views'
import { PlatformState } from '@youwol/os-core'
import { Observable } from 'rxjs'

const paragraphs = [
    `Py-YouWol is the local equivalent of the online YouWol platform, designed to run on a personal computer. `,
    `While the online ecosystem of YouWol is the go-to place for sharing resources, the local installation is preferred for the development of those resources.
    In fact, even for daily use of YouWol, the local application provides multiple benefits.`,
    `For a more detailed description of Py-YouWol, please refer to the embedded document on the left.`,
]

/**
 * @category View
 */
export class PyYouwolView extends SectionView {
    constructor({
        platformState,
        scrollTop$,
        titleId,
        nextTopic,
    }: {
        platformState: PlatformState
        scrollTop$: Observable<number>
        titleId: string
        nextTopic?: { id: string; title: string }
    }) {
        super({
            cdnPackage: '@youwol/stories',
            parameters: {
                id: '9e664525-1dac-45af-83c6-f4b4ef3866af',
                mode: 'reader',
                config: window.btoa(
                    JSON.stringify({
                        explorer: { viewState: 'pined' },
                    }),
                ),
            },
            platformState,
            paragraphs,
            reversed: true,
            scrollTop$,
            titleId,
            nextTopic,
        })
    }
}
