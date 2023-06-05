import IconEdit from '@/components/Icon/IconEdit';
import Header from '@/components/Layout/Header';
import Link from 'next/link';
import IconQuestion from '@/components/Icon/IconQuestion';
import IconUpload from '@/components/Icon/IconUpload';
import { useEffect, useRef, useState } from 'react';
import OrganizationAddresses from '@/components/OrganizationAddresses';
import OrganizationAge from '@/components/OrganizationAge';
import OrganizationEdit from '@/components/OrganizationEdit';
import OrganizationDropdown from '@/components/Organization/OrganizationDropdown';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import { useWorkspace } from '@/hooks/useWorkspace';

const Organization = () => {
    const infoModal = useRef();
    const addressesModal = useRef();
    const ageModal = useRef();
    const [organizationInfo, setOrganizationInfo] = useState({});
    const { current } = useWorkspace();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { data } = await axios.get(`admin/organizations/${current().id}`);
        setOrganizationInfo(data);
    };

    return (
        <>
            <Header
                title={
                    <>
                        <li className="font-semibold text-primary">
                            <Link href="/organization/settings" className="hover:text-primary/80">
                                Organizations
                            </Link>
                        </li>
                        <li>/ {organizationInfo.name} / Settings</li>
                    </>
                }
                action={<OrganizationDropdown />}
            ></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="space-y-4 xl:space-y-[30px]">
                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark">
                                Information
                                <button
                                    type="button"
                                    className="text-primary hover:text-black"
                                    onClick={() => infoModal.current.open()}
                                >
                                    <IconEdit />
                                </button>
                            </h2>

                            <span className="status bg-success/10 text-success">Claimed</span>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
                            <div>
                                <label className="form-label">Organization Name</label>
                                <p className="leading-5">{organizationInfo.name}</p>
                            </div>

                            <div>
                                <label className="form-label">Short Name</label>
                                <p className="leading-5">{helper.isEmpty(organizationInfo.short_name)}</p>
                            </div>

                            <div className="hidden sm:block"></div>

                            <div className="hidden sm:block"></div>

                            <div>
                                <label className="form-label">Organization Parent</label>
                                <p className="leading-5">{helper.isEmpty(organizationInfo.parent)}</p>
                            </div>

                            <div>
                                <label className="form-label">Phone Number</label>
                                <p className="leading-5">{helper.isEmpty(organizationInfo.phone)}</p>
                            </div>

                            <div>
                                <label className="form-label">Organization Web Domain</label>
                                <p>
                                    {organizationInfo.web_domain ? (
                                        <Link
                                            href={organizationInfo.web_domain}
                                            className="break-words font-semibold leading-5 text-primary hover:text-black-dark"
                                        >
                                            {organizationInfo.web_domain}
                                        </Link>
                                    ) : (
                                        '-'
                                    )}
                                </p>
                            </div>

                            <div>
                                <label className="form-label">Internal Web Domain</label>
                                <p>
                                    {organizationInfo.internal_web_domain ? (
                                        <Link
                                            href={organizationInfo.internal_web_domain}
                                            className="break-words font-semibold leading-5 text-primary hover:text-black-dark"
                                        >
                                            {organizationInfo.internal_web_domain}
                                        </Link>
                                    ) : (
                                        '-'
                                    )}
                                </p>
                            </div>

                            <div>
                                <label className="form-label">Organization ID</label>
                                <p className="leading-5">{helper.isEmpty(organizationInfo.organization_id)}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark">
                                Addresses
                                <button
                                    type="button"
                                    className="text-primary hover:text-black"
                                    onClick={() => addressesModal.current.open()}
                                >
                                    <IconEdit />
                                </button>
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
                            <div>
                                <label className="form-label">Location Address</label>
                                <p className="leading-5">
                                    {helper.isEmpty(
                                        organizationInfo.location_address_line1,
                                        organizationInfo.location_address_line2,
                                        organizationInfo.location_address_city,
                                        organizationInfo.location_address_state,
                                        organizationInfo.location_address_country
                                    )}
                                </p>
                            </div>

                            <div>
                                <label className="form-label">General Mailing Address</label>
                                <p className="leading-5">
                                    {helper.isEmpty(
                                        organizationInfo.general_mailling_address_line1,
                                        organizationInfo.general_mailling_address_line2,
                                        organizationInfo.general_mailling_address_city,
                                        organizationInfo.general_mailling_address_state,
                                        organizationInfo.general_mailling_address_country
                                    )}
                                </p>
                            </div>

                            <div>
                                <label className="form-label">Donation Mailing Address</label>
                                <p className="leading-5">
                                    {helper.isEmpty(
                                        organizationInfo.donation_mailling_address_line1,
                                        organizationInfo.donation_mailling_address_line2,
                                        organizationInfo.donation_mailling_address_city,
                                        organizationInfo.donation_mailling_address_state,
                                        organizationInfo.donation_mailling_address_country
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark">
                                Age Suitability
                                <button
                                    type="button"
                                    className="text-primary hover:text-black"
                                    onClick={() => ageModal.current.open()}
                                >
                                    <IconEdit />
                                </button>
                            </h2>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {organizationInfo.age_suitability
                                ? organizationInfo.age_suitability?.map((age) => {
                                      return <div key={age} className="icon-status">{`Age ${age}`}</div>;
                                  })
                                : '-'}
                        </div>
                    </div>

                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-black-dark">Assets</h2>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            <div>
                                <label className="form-label inline-flex items-center gap-1">
                                    Organization Logo
                                    <span>
                                        <IconQuestion />
                                    </span>
                                </label>
                                <div className="mb-1 flex w-[220px] items-center justify-center">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex h-[140px] w-full cursor-pointer flex-col items-center justify-center rounded-[3px] border border-dashed border-white-light bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] duration-300"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2.5 text-primary">
                                            <div className="opacity-50">
                                                <IconUpload />
                                            </div>
                                            <p className="font-semibold">Upload image(s)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                                <p className="text-sm italic text-black-dark">This is some upload information.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <OrganizationEdit ref={infoModal} data={organizationInfo}></OrganizationEdit>
                <OrganizationAddresses ref={addressesModal} data={organizationInfo}></OrganizationAddresses>
                <OrganizationAge ref={ageModal} data={organizationInfo.age_suitability}></OrganizationAge>
            </div>
        </>
    );
};

export default Organization;

Organization.middleware = {
    auth: true,
    verify: true,
};
