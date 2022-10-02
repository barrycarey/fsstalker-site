import {Box, Button, Divider, Paper, styled, Typography} from "@mui/material";

type CompPromps = {
    title: string,
    content: string
}

export const ContentBox = styled('div')({
    borderRadius: 1,
    maxWidth: '100%',
    height: '70%',
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

const upgradeOnClick = () => {
    window.open('https://www.patreon.com/bstsleuth' ,'_blank')
}

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
                <TitleBox sx={{pb:2}}>
                    <Button variant="outlined"  color="success" onClick={upgradeOnClick}>Upgrade</Button>
                </TitleBox>
            </Box>
        </Paper>
    )
}

export default StatBox;
