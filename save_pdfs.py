import os
import shutil
from pathlib import Path

def save_pdfs_from_folder():
    """
    Save/copy all PDF files from the PDF folder on desktop
    """
    # Define source and destination paths
    desktop_path = Path.home() / "Desktop"
    pdf_folder = desktop_path / "pdf"
    
    # Create destination folder for saved PDFs
    saved_pdfs_folder = desktop_path / "saved_pdfs"
    saved_pdfs_folder.mkdir(exist_ok=True)
    
    # Check if PDF folder exists
    if not pdf_folder.exists():
        print(f"PDF folder not found at: {pdf_folder}")
        print("Please check if the folder exists and try again.")
        return
    
    # Find all PDF files in the folder
    pdf_files = list(pdf_folder.glob("*.pdf"))
    
    if not pdf_files:
        print(f"No PDF files found in: {pdf_folder}")
        return
    
    print(f"Found {len(pdf_files)} PDF files in the folder.")
    
    # Copy each PDF file
    copied_count = 0
    for pdf_file in pdf_files:
        try:
            destination = saved_pdfs_folder / pdf_file.name
            shutil.copy2(pdf_file, destination)
            print(f"Copied: {pdf_file.name}")
            copied_count += 1
        except Exception as e:
            print(f"Error copying {pdf_file.name}: {e}")
    
    print(f"\nSuccessfully copied {copied_count} PDF files to: {saved_pdfs_folder}")

if __name__ == "__main__":
    save_pdfs_from_folder()
