import React, { useState } from 'react';
import { FileText, Download, Plus, Trash2, Upload, CreditCard as Edit3 } from 'lucide-react';
import InputForm from './components/InputForm';
import ReportTemplate from './components/ReportTemplate';
import { generatePDF } from './utils/pdfGenerator';
import { ReportData } from './types/ReportData';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'preview'>('form');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleFormSubmit = (data: ReportData) => {
    setReportData(data);
    setCurrentView('preview');
  };

  const handleGeneratePDF = async () => {
    if (!reportData) return;
    
    setIsGeneratingPDF(true);
    try {
      await generatePDF(reportData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-teal-700 p-4 rounded-full shadow-lg">
              <FileText className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">
            Vaishnavi Pathology Laboratory
          </h1>
          <h2 className="text-2xl font-semibold text-teal-700 mb-2">
            Report Generator
          </h2>
          <p className="text-lg text-gray-600">
            Professional Pathology Reports • NABL Accredited
          </p>
        </div>

        {/* Navigation */}
        {currentView === 'preview' && (
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handleBackToForm}
              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Edit3 className="h-5 w-5 mr-2" />
              Edit Report
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2" />
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {currentView === 'form' ? (
            <InputForm onSubmit={handleFormSubmit} />
          ) : (
            <ReportTemplate data={reportData!} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;