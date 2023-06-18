export default class ComputeLevenshteinDistance {
    static Distance(source, target) {
        if (source === null && target === null) return undefined;
        if (source === null || target === null) return target?.length ? target.length : source.length;
        if (source.length === 0 || target.length === 0) return target.length;
        if (source === target) return 0;
  
        const sourceWordCount = source.length;
        const targetWordCount = target.length;
  
        // Step 1
        if (sourceWordCount === 0)
            return targetWordCount;
  
        if (targetWordCount === 0)
            return sourceWordCount;
  
        const distance = new Array(sourceWordCount + 1);
        for (let i = 0; i <= sourceWordCount; i++) {
            distance[i] = new Array(targetWordCount + 1);
            distance[i][0] = i;
        }
        for (let j = 0; j <= targetWordCount; j++) {
            distance[0][j] = j;
        }
  
        for (let i = 1; i <= sourceWordCount; i++) {
            for (let j = 1; j <= targetWordCount; j++) {
                // Step 3
                const cost = target[j - 1] === source[i - 1] ? 0 : 1;
  
                // Step 4
                distance[i][j] = Math.min(
                    Math.min(distance[i - 1][j] + 1, distance[i][j - 1] + 1),
                    distance[i - 1][j - 1] + cost
                );
            }
        }
  
        return distance[sourceWordCount][targetWordCount];
    }

    static CalculateSimilarity(source, target) {
        if (source === null || target === null) return 0.0;
        if (source.length === 0 || target.length === 0) return 0.0;
        if (source === target) return 1.0;
  
        const stepsToSame = ComputeLevenshteinDistance.Distance(source, target);
        return 1.0 - stepsToSame / Math.max(source.length, target.length);
    }
}