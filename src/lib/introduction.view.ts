import { SectionView } from './views'
import { PlatformState } from '@youwol/os-core'
import { Observable } from 'rxjs'

const paragraphs = [
    `What YouWol is all about: empowering users to easily access and utilize an extensive ecosystem of numerical tools and applications.`,
    `It comes as a complementary solution to traditional cloud computing platforms. 
     Unlike those, YouWol operates by executing algorithms on the user's device within a browser. This approach may not always be applicable,
     but it provides significant advantages in terms of flexibility and ease of use in many scenarios, especially considering today's high performance personal computer capabilities.`,
    `The following highlights are intended to provide an overview of the key features of YouWol, for a more detailed description of YouWol,
     please refer to the embedded document on the right.`,
]

/**
 * @category View
 */
export class IntroductionView extends SectionView {
    constructor({
        platformState,
        scrollTop$,
        nextTopic,
    }: {
        platformState: PlatformState
        scrollTop$: Observable<number>
        nextTopic?: { title: string; id: string }
    }) {
        super({
            cdnPackage: '@youwol/stories',
            parameters: {
                id: '39ac0dab-a072-4fa2-98b8-7b9967b6eb43',
                mode: 'reader',
                config: window.btoa(
                    JSON.stringify({
                        explorer: { viewState: 'pined' },
                    }),
                ),
            },
            platformState: platformState,
            paragraphs,
            reversed: false,
            scrollTop$: scrollTop$,
            titleId: 'youwol',
            nextTopic: nextTopic,
        })
    }
}
