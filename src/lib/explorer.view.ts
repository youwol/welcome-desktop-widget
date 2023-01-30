import { SectionView } from './views'
import { PlatformState } from '@youwol/os-core'
import { Observable } from 'rxjs'

const paragraphs = [
    `In terms of user experience, YouWol is similar to traditional operating systems, offering features such as a
     launch-pad, management of applications, and notifications.`,
    `It comes with a few predefined applications, including a files explorer exposed on the left. 
    The items listed in the explorer are referred to as 'assets' which can range from simple files to more complex 
    data associated with multiple files and documents. 
    Depending on the type of assets, different actions are available on right-click, such as 'open-with' actions.`,
    `Developers have the flexibility to define their own assets,
     bind custom actions to them, and write 'installers' that add contributing elements to the user's environment, 
     including applications, plugins, and data.`,
]

/**
 * @category View
 */
export class ExplorerView extends SectionView {
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
            cdnPackage: '@youwol/explorer',
            parameters: {},
            platformState,
            paragraphs,
            reversed: true,
            scrollTop$,
            titleId,
            nextTopic,
        })
    }
}
