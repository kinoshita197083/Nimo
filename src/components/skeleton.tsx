type SkeletonProps = {
    displayText: string,
}

const Skeleton = (props: SkeletonProps) => {

    const { displayText } = props;

    return (
        <div className='bg-gray-200 min-h-[40rem] rounded flex items-center justify-center'>
            <h3 className='text-gray-400 text-[3rem]'>
                {displayText}
            </h3>
        </div>
    )
}

export default Skeleton
