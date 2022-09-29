import {Box, Divider, Paper, styled, Typography} from "@mui/material";

type CompPromps = {
    title: string,
    content: string
}

export const ContentBox = styled('div')({
    borderRadius: 1,
    maxWidth: '100%',
    height: '85%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    fontSize: "6rem"
})

export const TitleBox = styled('div')({
    borderRadius: 1,
    maxWidth: '100%',
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    fontSize: "1.7rem"
})

const StatBox = ({title, content}: CompPromps) => {

    return (
        <Paper elevation={2} sx={{width: "100%", height: "300px"}}>
            <Box sx={{height: "100%"}}>
                <TitleBox>
                    {title}
                </TitleBox>
                <Divider />
                <ContentBox>
                    {content}
                </ContentBox>
            </Box>
        </Paper>
    )
}

export default StatBox;
