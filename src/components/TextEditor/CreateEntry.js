import React, { Component, useContext, useState, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CodepalAppBar from "../EntryList/Header";
import { EntryContext } from "../DataProviders/EntryProvider";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { EntryTagContext } from "../DataProviders/EntryTagProvider";
import { TagsContext } from "../DataProviders/TagProvider";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(0.5),
		},
	},
	textRoot: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
	},
}));

export const CreateEntry = (props) => {
	const { addEntry } = useContext(EntryContext);

	const { getEntryTagsByEntryId, FilteredTagEntries } = useContext(
		EntryTagContext
	);

	const { getTags, addTag, getTagById, DeleteTagsById, tags } = useContext(
		TagsContext
	);

	const [entry, setEntry] = useState({});

	const [entryTags, setEntryTags] = useState({});

	const [richText, setRichText] = useState({});

	const [tag, setTag] = useState({});

	// This will be our first useEffect for the page to grab the first list of tags.
	useEffect(() => {
		getTags();
	}, []);

	const handleControlledInputChange = (event) => {
		const newEntry = { ...entry };

		newEntry[event.target.name] = event.target.value;

		setEntry(newEntry);
	};

	const classes = useStyles();

	const handleDeleteTag = () => {
		console.info("You clicked the delete icon.");
	};

	const handleClickTag = (tagObj) => {
		console.info("You clicked the Chip.");
		console.log("This should be a tag obj", tagObj);
	};

	const handleTagChange = (event) => {
		setTag(event.target.value);
	};

	// This will be our simple render Tag State
	const [EntryTagsHoldingArray, setEntryTagsHoldingArray] = useState([]);

	// Function for adding tags
	const addEntryTagToHoldingArray = () => {
		// code to add the tag to the Dom and load it into the entry
		const tempEntryTagObj = {
			tagId: parseInt(tag),
		};
		EntryTagsHoldingArray.push(tempEntryTagObj);
		console.log(
			"This should be an array with the holdeing tags",
			EntryTagsHoldingArray
		);
	};

	// This will be a use Effect for holding a temp array. I'm thinking that this should have been in
	// state. But I'm more comfortable writing it like this.
	// This will be for updating the rendered tags

	// This shit breaks it and I'm not sure why. It should only be updating when a new TagObj is added
	// but it just infinitly loops.

	// useEffect(() => {
	//   setRenderTags(RenderTagsArray);
	// }, [RenderTagsArray]);

	// This will be our builder function to create the entryObj to add to the api

	const constructEntryObject = () => {
		const createdDate = new Intl.DateTimeFormat("en-US").format(new Date());
		addEntry({
			userId: parseInt(sessionStorage.getItem("activeUserId")),
			title: entry.entryTitle,
			entryText: richText,
			date: createdDate,
		});
	};

	return (
		<Grid container direction="column">
			<Grid item>
				<CodepalAppBar />
			</Grid>
			<Grid item container>
				<Grid item xs={false} sm={2} />
				<Grid item xs={12} sm={8}>
					<Grid
						container
						alignItems="center"
						justify="center"
						style={{ margin: "1em" }}
					>
						<Paper style={{ height: "100%", width: "100%", margin: "1em" }}>
							<Grid container item={12} alignItems="center" justify="center">
								<Grid
									className="EntryDetails"
									container
									alignItems="center"
									justify="center"
									direction="column"
									style={{ margin: "1em" }}
								>
									<Grid
										container
										justify="space-evenly"
										style={{ margin: "1em" }}
									>
										<form
											className={classes.textRoot}
											noValidate
											autoComplete="off"
										>
											<TextField
												name="entryTitle"
												id="standard-basic"
												label="Entry Title"
												onChange={handleControlledInputChange}
												defaultValue={entry.entryTitle}
											/>
										</form>
									</Grid>
									<CKEditor
										className="textField"
										editor={ClassicEditor}
										data="This is the body text"
										onInit={(editor) => {
											// You can store the "editor" and use when it is needed.
										}}
										onChange={(event, editor) => {
											setRichText(editor.getData());
										}}
									/>
									<Grid
										container
										justify="space-evenly"
										style={{ margin: "1em" }}
									>
										<Grid direction="column">
											<InputLabel id="tags-select-label">Tags</InputLabel>
											<Select
												name="tagDropdown"
												labelId="tags-select-label"
												id="tag-select"
												value={tag}
												onChange={handleTagChange}
											>
												{tags.map((tagObj) => {
													return (
														<MenuItem key={tagObj.id} value={tagObj.id}>
															{tagObj.name}
														</MenuItem>
													);
												})}
											</Select>
										</Grid>
										{/* This will need to call a function that add a tag */}
										<Button
											type="button"
											variant="contained"
											color="primary"
											onClick={addEntryTagToHoldingArray}
										>
											Add Tag
										</Button>
									</Grid>
								</Grid>
								<div className={classes.root}>
									{tags.map((tagObj) => {
										return (
											<Chip
												key={tagObj.id}
												size="small"
												label={tagObj.name}
												onClick={() => {
													handleClickTag(tagObj);
												}}
												onDelete={handleDeleteTag}
											/>
										);
									})}
								</div>
								<Grid
									item
									container
									spacing={2}
									justify="space-around"
									style={{ margin: "1em" }}
								>
									<Grid item>
										<Button
											type="button"
											fullWidth
											variant="contained"
											color="primary"
											onClick={(event) => {
												event.preventDefault();
												constructEntryObject();
											}}
										>
											Save
										</Button>
									</Grid>
									<Grid item>
										<Button
											type="button"
											fullWidth
											variant="contained"
											color="primary"
										>
											Cancel
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<Grid item xs={false} sm={2} />
			</Grid>
		</Grid>
	);
};

export default CreateEntry;
