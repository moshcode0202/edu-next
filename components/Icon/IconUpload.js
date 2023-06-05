const IconUpload = ({ className = 'h-6 w-6' }) => {
    return (
        <svg className={className} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 13.5V14.7C19 16.3802 19 17.2202 18.673 17.862C18.3854 18.4265 17.9265 18.8854 17.362 19.173C16.7202 19.5 15.8802 19.5 14.2 19.5H5.8C4.11984 19.5 3.27976 19.5 2.63803 19.173C2.07354 18.8854 1.6146 18.4265 1.32698 17.862C1 17.2202 1 16.3802 1 14.7V13.5M15 6.5L10 1.5M10 1.5L5 6.5M10 1.5V13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconUpload;
