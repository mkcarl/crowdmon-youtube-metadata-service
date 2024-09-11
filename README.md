# Crowdmon Youtube Metadata Service 

This is a service to extract metadata related to a Youtube video. 
This will serve as a crucial service for the Crowdmon backend service in terms of automated image extraction. 


The reason this service is extracted from other services is due to the volatality of the Youtube API / ytdl-core as there were breaking changes that may break the whole backend process. 


As of 23 Jul 2024, ytdl-core is replaced with @distube/ytdl-core as the former was not working due to changes in the Youtube system. 
As of 11 Sep 2024, ytdl-core and @distube/ytdl-core is not working reliably, migrating to yt-dlp in python
## Starting server 
```
uvicorn main:app --reload --port 3010
```

## Required params (json)
```json 
{
  "url": ""
}
```
