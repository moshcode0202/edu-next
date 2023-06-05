import { useRouter } from 'next/router';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CommonSideModal from './Common/CommonSideModal';
import CommonAddressModal from './Common/CommonAddressModal';
import axios from '@/libs/axios';
const OrganizationAddressesDetail = ({ data, refresh }, forwardedRef) => {
    const modal = useRef();
    const router = useRouter();
    const defaultParams = { addressLine1: '', addressLine2: '', city: '', state: '', zipcode: '', country: '' };
    const [location, setLocation] = useState(defaultParams);
    const [generalMailing, setGeneralMailing] = useState(defaultParams);
    const [donation, setDonation] = useState(defaultParams);

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            // console.log(data);
            if (Object.keys(data).length) {
                setLocation({
                    addressLine1: data.location_address_line1,
                    addressLine2: data.location_address_line2 || '',
                    city: data.location_address_city,
                    state: data.location_address_state,
                    zipcode: data.location_address_zipcode,
                    country: data.location_address_country,
                });
                setGeneralMailing({
                    addressLine1: data.general_mailling_address_line1,
                    addressLine2: data.general_mailling_address_line2 || '',
                    city: data.general_mailling_address_city,
                    state: data.general_mailling_address_state,
                    zipcode: data.general_mailling_address_zipcode,
                    country: data.general_mailling_address_country,
                });
                setDonation({
                    addressLine1: data.donation_mailling_address_line1,
                    addressLine2: data.donation_mailling_address_line2 || '',
                    city: data.donation_mailling_address_city,
                    state: data.donation_mailling_address_state,
                    zipcode: data.donation_mailling_address_zipcode,
                    country: data.donation_mailling_address_country,
                });
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    const locationFormSubmit = async (value) => {
        const { data } = await axios.post(`/admin/organizations/${router.query.id}/location-info/`, {
            location_address_line1: value.addressLine1,
            location_address_line2: value.addressLine2,
            location_address_city: value.city,
            location_address_state: value.state,
            location_address_zipcode: value.zipcode,
            location_address_country: value.country,
        });
        modal?.current?.close();
        refresh();
    };
    const generalMailingFormSubmit = async (value) => {
        const { data } = await axios.post(`/admin/organizations/${router.query.id}/general-mailling-info/`, {
            general_mailling_address_line1: value.addressLine1,
            general_mailling_address_line2: value.addressLine2,
            general_mailling_address_city: value.city,
            general_mailling_address_state: value.state,
            general_mailling_address_zipcode: value.zipcode,
            general_mailling_address_country: value.country,
        });
        modal?.current?.close();
        refresh();
    };
    const donationFormSubmit = async (value) => {
        const { data } = await axios.post(`/admin/organizations/${router.query.id}/donation-info/`, {
            donation_mailling_address_line1: value.addressLine1,
            donation_mailling_address_line2: value.addressLine2,
            donation_mailling_address_city: value.city,
            donation_mailling_address_state: value.state,
            donation_mailling_address_zipcode: value.zipcode,
            donation_mailling_address_country: value.country,
        });
        modal?.current?.close();
        refresh();
    };
    return (
        <CommonSideModal ref={modal}>
            <h2 className="mb-5 text-xl font-semibold">Edit Address</h2>
            <div className="space-y-4 xl:space-y-[30px]">
                <CommonAddressModal data={location} title="Location" submit={locationFormSubmit} />
                <CommonAddressModal data={generalMailing} title="General Mailing" submit={generalMailingFormSubmit} />
                <CommonAddressModal data={donation} title="Donation" submit={donationFormSubmit} />
            </div>
        </CommonSideModal>
    );
};

export default forwardRef(OrganizationAddressesDetail);
