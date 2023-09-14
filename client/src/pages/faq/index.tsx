import React from "react"
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
export default function faq() {
    return (
        <>
            <LandingLayout>
                <Section title="Frequently Asked Questions">
                    <div className="w-full h-full">
                        <div>
                            {/* <h1  className="text-center text-5xl font-bold py-[50px]">Frequently Asked Questions</h1> */}
                            <div className="grid grid-cols-1 md: grid-cols-3 gap-10 pt-[30px]">
                                <div className="border border-1 border-black h-[400px] w-[300px] p-[20px] rounded-lg shadow-lg bg-sky-100">
                                    <h2 className="font-bold ">What Payment Methods Are Accepted?</h2>
                                    <p className="pt-[10px] ">
                                        BLA BLA BLA
                                    </p>
                                </div>
                                <div className="border border-1 border-black h-[400px] w-[300px] p-[20px] rounded-lg shadow-lg bg-sky-100">
                                    <h2 className="font-bold ">How do I receive my tickets?</h2>
                                    <p className="pt-[10px] ">
                                        BLA BLA BLA
                                    </p>
                                </div>
                                <div className="border border-1 border-black h-[400px] w-[300px] p-[20px] rounded-lg shadow-lg bg-sky-100">
                                    <h2 className="font-bold ">Can I Get a Refund or Exchange Tickets?</h2>
                                    <p className="pt-[10px] ">
                                        BLA BLA BLA
                                    </p>
                                </div>
                                <div className="border border-1 border-black h-[400px] w-[300px] p-[20px] rounded-lg shadow-lg bg-sky-100">
                                    <h2 className="font-bold ">What Happens If an Event Is Canceled or Rescheduled?</h2>
                                    <p className="pt-[10px] ">
                                        BLA BLA BLA
                                    </p>
                                </div>
                                <div className="border border-1 border-black h-[400px] w-[300px] p-[20px] rounded-lg shadow-lg bg-sky-100">
                                    <h2 className="font-bold ">Can I Transfer My Tickets to Someone Else?</h2>
                                    <p className="pt-[10px] ">
                                        BLA BLA BLA
                                    </p>
                                </div>
                                <div className="border border-1 border-black h-[400px] w-[300px] p-[20px] rounded-lg shadow-lg bg-sky-100">
                                    <h2 className="font-bold ">Is There a Waiting List for Sold-Out Events?</h2>
                                    <p className="pt-[10px] ">
                                        BLA BLA BLA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </LandingLayout>
        </>
    )
}