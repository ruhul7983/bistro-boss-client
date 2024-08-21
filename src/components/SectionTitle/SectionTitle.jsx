
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="text-center my-3 md:max-w-80 mx-auto">
            <p className="text-[#D99904]">--- {heading} ---</p>
            <h1 className="text-4xl my-1 uppercase py-2 border-y-2">{subHeading}</h1>
        </div>
    );
};

export default SectionTitle;