type PageLayoutProps = {
    children: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {

    const { children } = props;

    return (
        <main className='flex flex-col min-h-screen min-w-screen px-[8%] py-[2%]'>
            {children}
        </main>
    )
}

export default PageLayout
