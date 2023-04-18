import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import './Pagination.css'


export const Pages = ({ totalPost, postPerPage, currentPage, setCurrentPage }) => {


    const theme = createTheme({
        palette: {
            primary: {
                main: "#95c827",
                text: "#fff",
                common: "#fff",
            },

            secondary: {
                main: "#fff",
            },

            text: {
                primary: "#fff"
            }

        }
    })

    let pages = []
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pages.push(i)
    }

    if (currentPage <= 0) setCurrentPage(1)
    if (currentPage > pages.length) setCurrentPage(pages.length)

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    // const goToTop = () => {
    //     window.scrollTo({
    //         top: 40,
    //         behavior: 'smooth',
    //     });
    // };

    return (
        <div className="buttons_page">
            <ThemeProvider theme={theme}>
                <Stack spacing={4}>
                    <Pagination

                        size="small"
                        count={pages.length}
                        page={currentPage}
                        onChange={handleChange}
                        color="primary"

                    />
                </Stack>
            </ThemeProvider>
        </div>
    )

}
