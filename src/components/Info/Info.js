import React from 'react';

import './Info.css';

export default function Info() {
    return (
        <React.Fragment>
            <div className="form-header-container">
                <h1 className="main-header-small">
                    Information about the Shoot
                </h1>
            </div>
            <div className="info__container">
                <h2 className="info__section-header">
                    Before you arrive:
                </h2>
                <div className="info__section-details">
                    <h4>Script:</h4> 

                    <p>Script changes are not permitted once they are approved by Merrill Lynch.  While you will not need to memorize your script, please be sure to practice your script as much as possible before the shoot date.  We will have a copy of your script ready to go in our teleprompter when you arrive.  It is not required that you bring hard copies of the script but you may choose to do so.</p>

                    <h4>Preparation:</h4>
                    <p>We ask that you practice your script out-loud in front of the mirror or on a recording prior to filming so that you feel confident and prepared when on camera. You are also always welcome to contact our studio using the form below or at 412-404-2868 to schedule a 15 minute consultation.</p>

                    <h4>What to wear:</h4>

                    <p>Please wear a business professional outfit that suits your personality. You will be filmed against a white backdrop so avoid white or very light colored clothing. If you wear glasses, we recommend that you wear contacts or bring glasses with non-reflective lenses to avoid glare from the video lighting.</p>
                </div>
            </div>

            <div className="info__container">
                <h2 className="info__section-header">
                    What to expect the day of the video shoot:
                </h2>
                <div className="info__section-details">
                    <p>Please arrive 30 minutes before your selected time slot.  The first 30 minutes will be spent in hair and make up and then you will have a full hour block to work with our video team to capture your best take.  The total duration of time needed for this shoot  will be 1.5 hours.</p>

                    <p>For example, if you're time slot is for 9-10am, please plan to arrive for hair and makeup at 8:30am.</p>

                    <h4>Hair and make up:</h4>

                    <p>You will have approximately 30 minutes with a hair and makeup specialist to get you "camera ready."  Please arrive with 80% of your "look" as the artist will only be responsible for touch ups.  You are responsible to arrive with your desired hairstyle & facial hair trim.</p>

                    <h4>On camera:</h4>

                    <p>Your approved script will be teleprompted. Just relax, remember to smile, and most importantly… be yourself! Do not expect to get it on the first take. Most people take several tries and each time you will find yourself delivering the lines more naturally. You will have a full hour to get your best take. Once you get your best take, you will be asked to review, approve and sign off on which take you prefer the best. Refunds will not be issued after that point.  It is important that you sign off only if you are sure you will approve the video as re-shoot fees can be as costly as $8,000 depending on your location.</p>
                    
                    <h4>Review process:</h4>

                    <p>You will receive a draft of your video within 2 weeks of your shoot date.   Your video will go through 4 approval stages; first review, second review, third review and approved.ease wear a business professional outfit that suits your personality. You will be filmed against a white backdrop so avoid white or very light colored clothing. If you wear glasses, we recommend that you wear contacts or bring glasses with non-reflective lenses to avoid glare from the video lighting.</p>
                </div>
            </div>

            <div className="info__container">
                <h2 className="info__section-header">
                    Review process:
                </h2>
                <div className="info__section-details">
                    <h4>First Review:</h4>
                    
                    <p>You will have 1 week to review the first draft and provide any changes.  Changes that are permitted include the b-roll selection and placement and requesting alternate takes be used.  Some areas of the video are part of the Merrill Lynch template and cannot be changed. They include the intro graphic, font, lower thirds graphic, music, and background color.</p>

                    <p>If you do not review this draft within 1 week, your video will automatically be pushed to second review.</p>

                    <h4>Second Review:</h4>
                    
                    <p>You will receive the second draft of your video with your requested changes within 1 week of submitting your first review changes.   You will have 3 days to request any additional permitted changes.</p>

                    <p>If you do not review this draft within 3 days, your video will automatically be pushed to final review.</p>

                    <h4>Final Review:</h4>
                    
                    <p>You will receive a third draft of your video with your requested changes within 3 days of submitting your second review changes.   You will have an additional 3 days to request any additional permitted final changes.</p>

                    <p>If you do not review this draft within 3 days, your video will automatically be pushed to approved status.</p>

                    <h4>Approved Status:</h4>
                    
                    <p>Your approved video will be submitted to Merrill Lynch for approval and launch.  If you follow the approval process correctly, the video will approved within 6 weeks of the shoot date.</p>

                    <h4>Edits after approval:</h4>
                    
                    <p>Any changes to your video after its in "approved" status will be an additional $500 fee.  You will be permitted two rounds of revisions before the new approval.</p>

                    <h4>Re-shoots:</h4>
                    
                    <p>Re-shoots must be coordinated by contacting us using the form below.   Re-shoots should be a used only as a last resort as they can be as costly as $8,000 depending on the location.</p>
                </div>
            </div>
        </React.Fragment>
    )
}
