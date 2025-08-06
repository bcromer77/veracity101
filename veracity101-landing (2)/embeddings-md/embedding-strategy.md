# Embedding Strategy

We use AI embeddings to power semantic search across civic transcripts and ESG documents.

## Primary Sources
- City council transcripts (minutes, PDFs, audio)
- Legal/treaty documents
- Uploaded user reports

## Workflow

1. **Chunking:**  
   Documents are parsed into manageable text chunks (e.g., 200–500 tokens).

2. **Embedding Generation:**  
   Chunks are embedded using OpenAI (or custom) models.

3. **Vector Storage:**  
   Each vector is stored in MongoDB Atlas (Vector Search) or Pinecone, along with metadata for filtering and UI rendering.

### Sample Metadata Schema

```json
{
  "text": "Phoenix council votes to delay canal maintenance",
  "embedding": [0.01, 0.97, ...],
  "city": "Phoenix",
  "type": "council_transcript",
  "tags": ["infrastructure", "drought"],
  "date": "2025-07-11"
}
We are building a query-aware dashboard to allow semantic search across:

Local litigation risks (e.g., Arizona vs California)

ESG gaps across cities (e.g., Phoenix vs San Francisco)

Water policy risks (e.g., Colorado River shrinkage, Olympic readiness)

The current prototype is working — now we're ready to productize the vector search layer. We're looking to embed transcripts and reports into a performant, filterable system.
