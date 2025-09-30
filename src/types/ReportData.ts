export interface TestResult {
  id: string;
  testName: string;
  result: string;
  referenceRange: string;
  unit: string;
}

export interface ReportData {
  patientName: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  testDate: string;
  doctorName: string;
  testType: string;
  testResults: TestResult[];
  notes: string;
  signature?: string; // Base64 string
  reportId: string;
  generatedDate: string;
}