import helper from '@/libs/helper';
import CommonSideModal from '../Common/CommonSideModal';
import IconMinusCircle from '../Icon/IconMinusCircle';
import IconPlus from '@/components/Icon/IconPlus';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import axios from '@/libs/axios';
import { useWorkspace } from '@/hooks/useWorkspace';

const OrganizationProductsAvailability = ({ data, getOrganizationAges, refresh }, forwardedRef) => {
    const modal = useRef();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAges, setSelectedAges] = useState([]);
    const workSpace = useWorkspace();

    const openModalSelectedAges = () => {
        let modalAges = [];
        workSpace.current().age_suitability.map((age) => {
            modalAges.push(helper.getAge(age));
        });
        setSelectedAges(modalAges);
    };

    const openModalSelectedCategories = async () => {
        const { data } = await axios.get('/organization/excluded/categories/main');
        // const openCategory = openModal.data.map((category) => {
        //     return {
        //         id: category.id,
        //         name: category.name,
        //         toggle: true,
        //     };
        // });
        console.log(data);
        setSelectedCategories(data);
    };

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            // openModalData();
            openModalSelectedAges();
            openModalSelectedCategories();
        },
        close() {
            modal?.current?.close();
        },
    }));

    const inModalSelectedAges = (age) => {
        const modalAges = selectedAges.find((data) => data.value === age.value);
        let ages = selectedAges;
        if (modalAges) {
            ages = ages.filter((data) => data.value !== age.value);
        } else {
            ages.push(age);
        }
        setSelectedAges([...ages]);
    };

    // const ageDataModal = helper.getOrganizationAges().map((age) => {
    //     return {
    //         age: age.age,
    //         value: age.value,
    //         toggle: true,
    //     };
    // });
    const inModalSelectedCategory = (id) => {
        const category = selectedCategories.find((data) => data.id === id);
        category.is_excluded = category.is_excluded === 0 ? 1 : 0;
        setSelectedCategories([...selectedCategories]);
    };

    // const [selectedAge, setSelectedAge] = useState(ageDataModal);

    // const [selectedCategory, setSelectedCategory] = useState([]);

    // useEffect(() => {
    //     parentCategoryData();
    // }, []);
    const isCheckedAge = (id) => {
        return selectedAges.some((data) => data.value === id);
    };
    const saveAgeAndCategory = async () => {
        const categoryData = selectedCategories.filter((data) => data.is_excluded === 1);
        await axios.post('/organization/excluded/categories', {
            categories: categoryData.map((data) => data.id),
            age_suitability: selectedAges.map((data) => data.value),
        });
        refresh();
        modal?.current?.close();
    };

    // const changeOrganizationAge = (age) => {
    //     console.log('changeOrganizationAge', age);
    //     let aa = selectedAge;
    //     if (age.toggle) {
    //         aa[aa.indexOf(age)].toggle = false;
    //     } else {
    //         aa[aa.indexOf(age)].toggle = true;
    //     }
    //     setSelectedAge([...aa]);
    // };

    // const changeCategoryData = (category) => {
    //     console.log('changeOrganizationcategory', category);
    //     let aa = selectedCategory;
    //     console.log(aa);
    //     if (category.toggle) {
    //         aa[aa.indexOf(category)].toggle = false;
    //     } else {
    //         aa[aa.indexOf(category)].toggle = true;
    //     }
    //     setSelectedCategory([...aa]);
    // };

    return (
        <CommonSideModal ref={modal}>
            <div className="flex h-full flex-col justify-between">
                <div className="space-y-4 xl:space-y-[30px]">
                    <h2 className="text-xl font-semibold">Product Availability</h2>

                    <p className="text-black-dark">
                        Mange products that appear in your store for age suitability and category.
                    </p>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <h3 className="text-lg font-semibold text-black-dark">Age Suitability</h3>
                            <div className="space-y-3">
                                {helper.getOrganizationAges().map((age) => {
                                    return (
                                        <button
                                            type="button"
                                            key={age.value}
                                            className="flex cursor-pointer items-center gap-1.5"
                                            onClick={() => inModalSelectedAges(age)}
                                        >
                                            {isCheckedAge(age.value) ? (
                                                <IconMinusCircle className="h-6 w-6 flex-none text-danger" />
                                            ) : (
                                                <IconPlus className="h-6 w-6 flex-none text-success" />
                                            )}
                                            {/* {age.toggle ? ( */}
                                            {/* ) : ( */}
                                            {/* <IconPlus className="h-6 w-6 flex-none text-success" /> */}
                                            {/* )} */}

                                            <span className="icon-status">{age.age}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-4 xl:space-y-[30px]">
                            <h3 className="text-lg font-semibold text-black-dark">Category</h3>
                            <div className="space-y-3">
                                {selectedCategories.map((category) => {
                                    return (
                                        <button
                                            type="button"
                                            key={category.id}
                                            className="flex cursor-pointer items-center gap-1.5"
                                            onClick={() => inModalSelectedCategory(category.id)}
                                        >
                                            {category.is_excluded === 1 ? (
                                                <IconMinusCircle className="h-6 w-6 flex-none text-danger" />
                                                ) : (
                                                    <IconPlus className="h-6 w-6 flex-none text-success" />
                                            )}
                                            <span className="icon-status bg-black-dark/10 text-left">
                                                {category.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 text-right">
                    <button type="button" className="btn" onClick={() => saveAgeAndCategory()}>
                        Save
                    </button>
                </div>
            </div>
        </CommonSideModal>
    );
};

export default forwardRef(OrganizationProductsAvailability);
