import IconTrash from '@/components/Icon/IconTrash';

const OrganizationProductCard = ({title,price,suitabilityAge,deleteCard}) => {
    return (
        <div className="rounded bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] hover:shadow-[0px_6px_6px_rgba(0,0,0,0.07)]">
            <div className="relative h-56 overflow-hidden rounded-t">
                <img src="/assets/images/profile_img.jpg" alt="img" className="h-full w-full object-cover" />
                <span className="absolute top-2.5 left-3 right-3 w-fit rounded bg-primary px-1.5 py-1 text-sm text-white">
                    Suitability Age {suitabilityAge}
                </span>
            </div>
            <div className="flex items-start justify-between px-2.5 py-3.5">
                <div>
                    <h4 className="mb-2.5 font-semibold text-primary line-clamp-3 breakwords">{title}</h4>
                    <p className="text-sm">${price}</p>
                </div>
                <button type="button" className="rounded-full p-1.5 text-danger hover:bg-danger/10">
                    <IconTrash onClick={deleteCard}/>
                </button>
            </div>
        </div>
    );
};

export default OrganizationProductCard;
