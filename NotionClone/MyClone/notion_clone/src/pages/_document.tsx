import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";


export default function Document(){
    return (
        <Html>
            <Head>
                {/* <title>Notion Clone</title> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
                {/* <link rel="shortcut icon" href="../../public/favicon.ico" type="image/x-icon" /> */}
                {/* <link rel="icon" href="../../public/favicon.ico" type="image/x-icon" /> */}
            </Head>
            <body className="">
                <header className="w-5/6 p-2 mx-auto my-2 bg-appBase-500 flex flex-row items-center justify-between rounded-lg">
                    <div className="font-accent text-2xl text-appBase-100 font-bold">
                        <a href="/" role="link" tabIndex={0}>
                            notion<span className="text-xl">.clone</span>
                        </a>
                    </div>
                    <nav className="relative">
                        <div className="w-auto h-auto">
                            <span role="button" tabIndex={0} onClick={() => toggleContextMenu()}>
                                {/* <img src={UserIcon} alt="User Icon" /> */}
                            </span>
                        </div>
                        {/* <ContextMenu
                            menuItems={[
                                {
                                    id: "pages",
                                    label: "Pages",
                                    action: () => handleNavigation("/pages"),
                                },
                                {
                                    id: "account",
                                    label: "Account",
                                    action: () => handleNavigation("/account"),
                                },
                                {
                                    id: "logout",
                                    label: "Logout",
                                    action: () => handleNavigation("/logout"),
                                },
                            ]}
                            // closeAction={() => closeContextMenu()}
                            isTopNavigation={true}
                            /> */}
                    </nav>
                </header>
                <Main />
                <footer className="w-5/6 max-w-full m-1 mx-auto items-center">
                    <hr className="block w-full h-1 border-2 border-t border-appBase-700 mx-auto" />
                    <div className="w-5 h-auto my-2 mx-auto text-center items-center">
                        <a href="https://github.com/konstantinmuenster/notion-clone" rel="noopener noreferrer" role="link" tabIndex={0} >
                            <Image width={20} height={20} src="/github.svg" alt="Github Icon" />
                        </a>
                    </div>
                </footer>
                <NextScript />
            </body>
        </Html>
    );
}

const toggleContextMenu = () => {
    //setIsContextMenuOpen(!isContextMenuOpen);
};

const closeContextMenu = () => {
    //setIsContextMenuOpen(false);
};

const handleNavigation = (path:string) => {
    closeContextMenu();
    //router.push(path);
};