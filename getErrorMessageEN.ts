import { renderLinkMD } from '../markdown/renderLinkMD'
import { renderListMD } from '../markdown/renderListMD'

/**
 * Source: https://wix-ux.com/when-life-gives-you-lemons-write-better-error-messages-46c5223e1a2f
 */
export function getErrorMessageEN(whatHappened: string, whyItHappened: string, reassurance: string, howToFix: string[], supportUrl: string) {
  return {
    subject: whatHappened,
    body: `${whyItHappened} ${reassurance}
    
    ${renderListMD(howToFix)}
    
    If the issue is still present, please ${renderLinkMD('contact support', supportUrl)}.
    `,
  }
}
