import {Box, Chip, Grid, Stack, styled, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";

type CompPromps = {
    triggerWords: string,
    greenChip: boolean,
    title: string,
    updateTriggerWords: (words: string) => void
}

const ContainingBox = styled('div')({
    borderRadius: 6,
    maxWidth: '100%',
    overflowWrap: "break-word",
    background: '#3d3d3d',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    padding: 2,
    alignItems: 'center',
    verticalAlign: 'middle',
    minHeight: "50px"
})

const TriggerWords = ({triggerWords, updateTriggerWords, greenChip, title}: CompPromps) => {

    const [triggerList, setTriggerList] = useState<string[]>([]);
    const [triggerTxtValue, setTriggerTxtValue] = useState<string>('');

    useEffect(() => {
        if (triggerWords !== null) {
            if (triggerWords !== "") {
                setTriggerList(triggerWords.split(","))
            }
        }
    },[triggerWords])

    const onKeyUp = useCallback((event: any) => {
        if (event.key === 'Enter') {
            setTriggerList(prevValue => {
                const updatedList = [...prevValue, triggerTxtValue];
                updateTriggerWords(updatedList.join(","));
                return updatedList;
            });
            setTriggerTxtValue('');

        }
    }, [triggerTxtValue, triggerList])

    const triggerWordDelete = useCallback((idx: number) => {
        setTriggerList(prevState => {
            const updatedList = prevState.filter((_, index) => index !== idx)
            updateTriggerWords(updatedList.join(","));
            return updatedList;
        });
    }, [triggerList])

    return (
        <Box sx={{mt: 3}}>
            <Typography variant={"h6"} sx={{fontSize: 18}}>{title}:</Typography>
            <ContainingBox>
                <Grid container spacing={0}>
                    {triggerList.map((i: string, idx: number) => (
                        <Grid item xs={4} xl={3}>
                            <Chip size="small" label={i} onDelete={() => {triggerWordDelete(idx)}} sx={{mb: 1}} color={greenChip ? "success" : "error"}/>
                        </Grid>
                    ))}

                </Grid>
            </ContainingBox>
            <TextField
                sx={{mt: 1}}
                id="outlined-basic"
                fullWidth
                label={`Enter ${title}`}
                variant="standard"
                value={triggerTxtValue}
                onChange={(e: any) => setTriggerTxtValue(e.target.value)}
                onKeyPress={onKeyUp}
            />
        </Box>

    );
}


export default TriggerWords;
