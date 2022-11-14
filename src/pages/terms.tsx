import { Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { LandingLayout, LeftBar } from 'ui/landing'

const Terms: NextPage = () => {
  return (
    <LandingLayout dark inView>
      <Head>
        <title>Terms of Service</title>
      </Head>
      <LeftBar isBlue={false} inView />
      <div className="flex">
        <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
        <div className="flex flex-col x:max-w-[1000px] xl:max-w-[800px] 2xl:max-w-[1000px] 5xl:max-w-[1200px] w-full gap-[31px] xl:gap-[41px] mt-[98px] px-[30px] pb-[152px] xl:px-0 xl:mt-[62px] xl:mb-[199px] mx-auto">
          <Typography variant="heading6">Terms of Service</Typography>
          <Typography variant="body" className="leading-normal">
            <p>
              This End User License Agreement (&ldquo;Agreement&rdquo;) is a binding agreement between you (&ldquo;End
              User&rdquo; or &ldquo;you&rdquo;) and Teddy B, LLC (&ldquo;Company&rdquo;). This Agreement governs your
              use of Company&rsquo;s Move Fit mobile application, (including all related documentation, the
              &ldquo;Application&rdquo;). The Application is licensed, not sold, to you. &nbsp;&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              BY DOWNLOADING THE APPLICATION, YOU: (A) ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND THIS AGREEMENT; (B)
              REPRESENT THAT YOU ARE AUTHORIZED WITH PROPER CREDENTIALS AND PASSWORDS TO ACCESS AND USE THE APPLICATION;
              AND (C) ACCEPT THIS AGREEMENT AND AGREE THAT YOU ARE LEGALLY BOUND BY ITS TERMS. IF YOU DO NOT AGREE TO
              THESE TERMS, DO NOT DOWNLOAD, INSTALL, OR USE THE APPLICATION AND DELETE IT FROM YOUR MOBILE, DESKTOP, OR
              OTHER DEVICE.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              1. License Grant. Subject to the terms of this Agreement, Company grants you a limited, non-exclusive, and
              nontransferable license to:&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (a) Download, install, and use the Application for your use on a
              mobile, desktop, or other device owned or otherwise controlled by you (&ldquo;Device&rdquo;) strictly in
              accordance with the Application&rsquo;s documentation; and&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (b) Access, stream, download, and use on such Device the Content and
              Services (as defined in Section 5) made available in or otherwise accessible through the Application,
              strictly in accordance with the grants and restrictions defined in the following Sections of this
              Agreement (&ldquo;Terms of Use&rdquo;).
            </p>
            <p>
              <br />
            </p>
            <p>
              &nbsp;2. License Restrictions. End User shall not use the Application for any purposes beyond the scope of
              the access granted in this Agreement. In particular, End User shall not:&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (a) Copy the Application or the Content and Services, except as
              expressly permitted by this license;&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (b) Modify, translate, adapt, or otherwise create derivative works or
              improvements, whether or not patentable, of the Application;&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (c) Reverse engineer, disassemble, decompile, decode, or otherwise
              attempt to derive or gain access to the source code of the Application or any part thereof;&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (d) Remove, delete, alter, or obscure any trademarks or any copyright,
              trademark, patent, or other intellectual property or proprietary rights notices from the Application,
              including any copy thereof;&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (e) Rent, lease, lend, sell, sublicense, assign, distribute, publish,
              transfer, or otherwise make available the Application, or any features or functionality of the
              Application, to any third party for any reason, including by making the Application available on a network
              where it is capable of being accessed by more than one device at any time;&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (f) Use the Application in any manner or for any purpose that
              infringes, misappropriates, or otherwise violates any intellectual property right or other right of any
              person, or that violates any applicable law;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (g) Use the Application in any manner or for any purpose that causes
              the unauthorized storage or transmission of personally identifiable information (&ldquo;PII&rdquo;),
              personal health information (&ldquo;PHI&rdquo;), or any other sensitive information or data to which an
              individual has an objectively clear right of privacy; or&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (h) Remove, disable, circumvent, or otherwise create or implement any
              workaround to any copy protection, rights management, or security features in or protecting the
              Application.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              3. Reservation of Rights. You acknowledge and agree that the Application is provided under license, and
              not sold, to you. You do not acquire any ownership interest in the Application under this Agreement, or
              any other rights thereto other than to use the Application in accordance with the license granted, and
              subject to all terms, conditions, and restrictions, under this Agreement. Company and its licensors and
              service providers reserve and shall retain their entire right, title, and interest in and to the
              Application, including all copyrights, trademarks, trade secrets, and other intellectual property rights
              therein or relating thereto, except as expressly granted to you in this Agreement.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              4. Collection and Use of Your Information. You acknowledge that when you download, install, or use the
              Application, Company may use automatic means (including, for example, cookies and web beacons) to collect
              information about your Device and about your use of the Application. You also may be required to provide
              certain information about yourself as a condition to downloading, installing, or using the Application or
              certain of its features or functionality, and the Application may provide you with opportunities to share
              information about yourself with others. All information we collect through or in connection with this
              Application is subject to our{' '}
              <Link href="/privacy">
                <a className="underline-offset-1 hover:underline">Privacy Policy</a>
              </Link>
              . By downloading, installing, using, and providing information to or through this Application, you consent
              to all actions taken by us with respect to your information in compliance with the Privacy Policy. You
              hereby grant us a perpetual non-exclusive royalty free right and license to copy, modify, and use any
              information and data supplied by you or collected on your behalf so that we may enhance the Application
              and our Services, including but not limited to the right to use, repurpose, and monetize aggregate data
              and to create analytical trend data (in anonymous form) that may be shared with or sold to third parties.
              In no event will any information be disclosed in a manner that allows particular customers or individuals
              to be identified. Notwithstanding the foregoing, you agree that your customer name may appear in a list of
              participating organizations for reports containing such analytical trend data.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              5. Content and Services. The Application provides you with access to products, services, features,
              functionality, and content accessible on or through the Application and/or hosted on Company&rsquo;s
              website or other online sources (collectively, &ldquo;Content and Services&rdquo;). Your access to and use
              of such Content and Services are governed by these Terms of Use and our Privacy Policy, which is
              incorporated herein by this reference. YOU ASSUME THE RISK of using the Content and Services. Your access
              to and use of such Content and Services may require you to acknowledge your acceptance of such Terms of
              Use and Privacy Policy and/or to create a user account or otherwise register your usage of the
              Application, and your failure to do so may restrict you from accessing or using certain of the
              Application&rsquo;s features and functionality. Any violation of the Terms of Use will also be deemed a
              violation of this Agreement.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              6. Geographic Restrictions. The Content and Services are based in the United States and provided for
              access and use only by persons located in the United States. You acknowledge that you may not be able to
              access all or some of the Content and Services outside of the United States and that access thereto may
              not be legal by certain persons or in certain countries. If you access the Content and Services from
              outside the United States, you are responsible for compliance with local laws.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              7. Updates. Company may from time-to-time in its sole discretion develop and provide Application updates,
              which may include upgrades, bug fixes, patches, other error corrections, and/or new features
              (collectively, including related documentation, &ldquo;Updates&rdquo;). Updates may also modify or delete
              in their entirety certain features and functionality. You agree that Company has no obligation to provide
              any Updates or to continue to provide or enable any particular features or functionality. Based on your
              Device settings, when your Device is connected to the internet either (a) The Application will
              automatically download and install all available Updates, or (b) You may receive notice of or be prompted
              to download and install available Updates. You shall promptly download and install all Updates and
              acknowledge and agree that the Application or portions thereof may not properly operate should you fail to
              do so. You further agree that all Updates will be deemed part of the Application and be subject to all
              terms and conditions of this Agreement.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              8. Third-Party Materials. The Application may display, include, or make available third-party content
              (including audiovisual content, data, information, applications, and other products, services, and/or
              materials) or provide links to third-party websites or services, including through third-party advertising
              (&ldquo;Third-Party Materials&rdquo;). You acknowledge and agree that Company is not responsible for
              Third-Party Materials, including their accuracy, completeness, timeliness, validity, copyright compliance,
              legality, decency, quality, safety, or any other aspect thereof. YOU ASSUME THE RISK of using the
              Third-Party Materials; Company does not assume and will not have any liability or responsibility to you or
              any other person or entity for any Third-Party Materials or your use thereof. Third-Party Materials and
              links thereto are provided solely as a convenience to you, and you access and use them entirely at your
              own risk and subject to such third parties&rsquo; terms and conditions.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>9. Term and Termination.&nbsp;</p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(a) The term of Agreement commences when you download or install the
              Application and will continue in effect until terminated by you or Company as set forth in this Section
              9.&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(b) You may terminate this Agreement by deleting the Application and all
              copies thereof from your Device.&nbsp;
            </p>
            <p>
              (c) Company may terminate this Agreement at any time without notice if it ceases to support the
              Application, which Company may do in its sole discretion. In addition, this Agreement will terminate
              immediately and automatically without any notice if you violate any of the terms and conditions of this
              Agreement.&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(d) Upon termination: (i) All rights granted to you under this Agreement
              will also terminate; and (ii) You must cease all use of the Application and delete all copies of the
              Application from your Device and account.&nbsp;
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(e) Termination will not limit any of Company&rsquo;s rights or remedies
              at law or in equity.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              10. Disclaimer of Warranties. THE APPLICATION IS PROVIDED TO END USER &ldquo;AS IS&rdquo; AND WITH ALL
              FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW,
              COMPANY, ON ITS OWN BEHALF AND ON BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND
              SERVICE PROVIDERS, EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE,
              WITH RESPECT TO THE APPLICATION, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING,
              COURSE OF PERFORMANCE, USAGE, OR TRADE PRACTICE. WITHOUT LIMITATION TO THE FOREGOING, COMPANY PROVIDES NO
              WARRANTY OR UNDERTAKING, AND MAKES NO REPRESENTATION OF ANY KIND THAT THE APPLICATION WILL MEET YOUR
              REQUIREMENTS, ACHIEVE ANY INTENDED RESULTS, BE COMPATIBLE, OR WORK WITH ANY OTHER SOFTWARE, APPLICATIONS,
              SYSTEMS, OR SERVICES, OPERATE WITHOUT INTERRUPTION, MEET ANY PERFORMANCE OR RELIABILITY STANDARDS OR BE
              ERROR-FREE, OR THAT ANY ERRORS OR DEFECTS CAN OR WILL BE CORRECTED.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF OR LIMITATIONS ON IMPLIED WARRANTIES OR THE LIMITATIONS
              ON THE APPLICABLE STATUTORY RIGHTS OF A CONSUMER, SO SOME OR ALL OF THE ABOVE EXCLUSIONS AND LIMITATIONS
              MAY NOT APPLY TO YOU.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              11. Limitation of Liability. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL COMPANY
              OR ITS AFFILIATES, OR ANY OF ITS OR THEIR RESPECTIVE LICENSORS OR SERVICE PROVIDERS, HAVE ANY LIABILITY
              ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE APPLICATION OR THE CONTENT AND SERVICES
              FOR: (a) PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, COST OF SUBSTITUTE GOODS OR SERVICES, LOSS OF
              DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, COMPUTER FAILURE OR MALFUNCTION, OR ANY OTHER
              CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES; AND/OR (b) DIRECT DAMAGES IN
              AMOUNTS THAT IN THE AGGREGATE EXCEED THE AMOUNT ACTUALLY PAID BY YOU FOR THE APPLICATION.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              THE FOREGOING LIMITATIONS WILL APPLY WHETHER SUCH DAMAGES ARISE OUT OF BREACH OF CONTRACT, TORT (INCLUDING
              NEGLIGENCE), OR OTHERWISE AND REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE OR COMPANY WAS ADVISED
              OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS OF LIABILITY SO
              SOME OR ALL OF THE ABOVE LIMITATIONS OF LIABILITY MAY NOT APPLY TO YOU.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              12. Indemnification. You agree to indemnify, defend, and hold harmless Company and its officers,
              directors, employees, agents, affiliates, successors, and assigns from and against any and all losses,
              damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties,
              fines, costs, or expenses of whatever kind, including attorney&rsquo;s fees, arising from or relating to
              your use or misuse of the Application and the Content and Services or to your breach of this Agreement,
              including but not limited to your use of Third-Party Materials made available through this Application and
              the content you submit or make available through this Application.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              13. Export Regulation. The Application may be subject to U.S. export control laws, including the U.S.
              Export Administration Act and its associated regulations. You shall not, directly or indirectly, export,
              re-export, or release the Application to, or make the Application accessible from, any jurisdiction or
              country to which export, re-export, or release is prohibited by law, rule, or regulation. You shall comply
              with all applicable federal laws, regulations, and rules, and complete all required undertakings
              (including obtaining any necessary export license or other governmental approval), prior to exporting,
              re-exporting, releasing, or otherwise making the Application available outside the U.S.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              14. U.S. Government Rights. The Application is commercial computer software, as such term is defined in 48
              C.F.R. &sect; 2.101. Accordingly, if you are an agency of the U.S. Government or any contractor therefor,
              you receive only those rights with respect to the Application as are granted to all other end users under
              license, in accordance with: (a) 48 C.F.R. &sect; 227.7201 through 48 C.F.R. &sect; 227.7204, with respect
              to the Department of Defense and their contractors; or (b) 48 C.F.R. &sect; 12.212, with respect to all
              other U.S. Government licensees and their contractors.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              15. Severability. If any provision of this Agreement is illegal or unenforceable under applicable law, the
              remainder of the provision will be amended to achieve as closely as possible the effect of the original
              term and all other provisions of this Agreement will continue in full force and effect.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              16. Governing Law. This Agreement is governed by and construed in accordance with the internal laws of the
              State of Arizona without giving effect to any choice or conflict of law provision or rule. Any legal suit,
              action, or proceeding arising out of or related to this Agreement or the Application shall be instituted
              exclusively in the federal courts of the United States or the courts of the State of Arizona in each case
              located in Maricopa County. You waive any and all objections to the exercise of jurisdiction over you by
              such courts and to venue in such courts.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              17. Limitation of Time to File Claims. ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR
              RELATING TO THIS AGREEMENT OR THE APPLICATION MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF
              ACTION ACCRUES OTHERWISE SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              18. Entire Agreement. This Agreement, and our Privacy Policy constitute the entire agreement between you
              and Company with respect to the Application and supersede all prior or contemporaneous understandings and
              agreements, whether written or oral, with respect to the Application.
            </p>
            <p>
              <br />
            </p>
            <p>
              19. Waiver. No failure to exercise, and no delay in exercising, on the part of either party, any right or
              any power hereunder shall operate as a waiver thereof, nor shall any single or partial exercise of any
              right or power hereunder preclude further exercise of that or any other right hereunder. In the event of a
              conflict between this Agreement and any applicable purchase or other terms, the terms of this Agreement
              shall govern.
            </p>
          </Typography>
        </div>
      </div>
    </LandingLayout>
  )
}

export default Terms
