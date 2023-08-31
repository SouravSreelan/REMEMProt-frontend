interface ResultItem {
    id: string;
    pmid: string;
    author: string;
    paper: string;
    organism: string;
    CellOrtissue: string;
    disease: string;
    profileOrDifex: string;
    contxtOfIdent: string;
    contxtOfDiferentialREG: string;
    test: string;
    control: string;
    foldchange: string;
    expression: string;
    protienExtractMethod: string;
    geneSymbol: string;
    geneID: string;
    tissuetype: string;
    cancertype: string;
    cellname: string;
    isTrans: string;
}


interface pagination {
    has_next: boolean;
    total_pages: number;
}


interface EnrichmentResult {
    count: number;
    enrichment: string;
    p_value: number;
    percentage: string;
    method: string
    log10pval: number;
}

interface BubbleChartProps {
    data: EnrichmentResult[];
}
