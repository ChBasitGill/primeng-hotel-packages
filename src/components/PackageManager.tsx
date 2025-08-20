import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Chip } from 'primereact/chip';
import { Badge } from 'primereact/badge';
import { Package, Hotel, Excursion, TourService } from '../types/Package';

const PackageManager: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      nights: 6,
      city: 'Paris',
      hotels: [
        { id: '1', hotel: 'Hotel Luxury', roomType: 'Double' },
        { id: '2', hotel: 'Budget Inn', roomType: 'Single' }
      ],
      excursions: [
        { id: '1', name: 'Eiffel Tower Tour' },
        { id: '2', name: 'Louvre Museum' }
      ],
      tourServices: [
        { id: '1', name: 'Airport Transfer' },
        { id: '2', name: 'City Guide' }
      ]
    }
  ]);

  const [expandedRows, setExpandedRows] = useState<any>(null);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [showServicesDialog, setShowServicesDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [editingPackage, setEditingPackage] = useState(false);

  // Form states
  const [nights, setNights] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState('');

  // Hotel form states
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');

  // Excursion form states
  const [selectedExcursions, setSelectedExcursions] = useState<string[]>([]);

  // Tour service form states
  const [selectedTourServices, setSelectedTourServices] = useState<string[]>([]);

  const cities = [
    { label: 'Paris', value: 'Paris' },
    { label: 'London', value: 'London' },
    { label: 'Rome', value: 'Rome' },
    { label: 'Barcelona', value: 'Barcelona' },
    { label: 'Amsterdam', value: 'Amsterdam' }
  ];

  const hotels = [
    { label: 'Hotel Luxury', value: 'Hotel Luxury' },
    { label: 'Budget Inn', value: 'Budget Inn' },
    { label: 'Grand Palace', value: 'Grand Palace' },
    { label: 'City Center Hotel', value: 'City Center Hotel' }
  ];

  const roomTypes = [
    { label: 'Single', value: 'Single' },
    { label: 'Double', value: 'Double' },
    { label: 'Master', value: 'Master' }
  ];

  const excursions = [
    { label: 'Eiffel Tower Tour', value: 'Eiffel Tower Tour' },
    { label: 'Louvre Museum', value: 'Louvre Museum' },
    { label: 'Seine River Cruise', value: 'Seine River Cruise' },
    { label: 'Versailles Palace', value: 'Versailles Palace' },
    { label: 'Montmartre Walking Tour', value: 'Montmartre Walking Tour' }
  ];

  const tourServices = [
    { label: 'Airport Transfer', value: 'Airport Transfer' },
    { label: 'City Guide', value: 'City Guide' },
    { label: 'Car Rental', value: 'Car Rental' },
    { label: 'Travel Insurance', value: 'Travel Insurance' },
    { label: 'WiFi Device', value: 'WiFi Device' }
  ];

  const resetForm = () => {
    setNights(1);
    setSelectedCity('');
  };

  const resetHotelForm = () => {
    setSelectedHotel('');
    setSelectedRoomType('');
  };

  const resetExcursionForm = () => {
    setSelectedExcursions([]);
  };

  const resetServiceForm = () => {
    setSelectedTourServices([]);
  };

  const handleAddPackage = () => {
    if (!nights || !selectedCity) return;

    const newPackage: Package = {
      id: Date.now().toString(),
      nights,
      city: selectedCity,
      hotels: [],
      excursions: [],
      tourServices: []
    };

    if (editingPackage && selectedPackage) {
      setPackages(prev => prev.map(pkg => 
        pkg.id === selectedPackage.id 
          ? { ...selectedPackage, nights, city: selectedCity }
          : pkg
      ));
    } else {
      setPackages(prev => [...prev, newPackage]);
    }

    setShowPackageDialog(false);
    resetForm();
    setEditingPackage(false);
    setSelectedPackage(null);
  };

  const handleEditPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setNights(pkg.nights);
    setSelectedCity(pkg.city);
    setEditingPackage(true);
    setShowPackageDialog(true);
  };

  const handleDeletePackage = (pkg: Package) => {
    confirmDialog({
      message: 'Are you sure you want to delete this package?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setPackages(prev => prev.filter(p => p.id !== pkg.id));
      }
    });
  };

  const handleAddHotel = () => {
    if (!selectedPackage || !selectedHotel || !selectedRoomType) return;

    const newHotel: Hotel = {
      id: Date.now().toString(),
      hotel: selectedHotel,
      roomType: selectedRoomType
    };

    setPackages(prev => prev.map(pkg => 
      pkg.id === selectedPackage.id 
        ? { ...pkg, hotels: [...pkg.hotels, newHotel] }
        : pkg
    ));

    resetHotelForm();
  };

  const handleAddExcursion = () => {
    if (!selectedPackage || selectedExcursions.length === 0) return;

    const newExcursions: Excursion[] = selectedExcursions.map(name => ({
      id: Date.now().toString() + Math.random(),
      name
    }));

    setPackages(prev => prev.map(pkg => 
      pkg.id === selectedPackage.id 
        ? { ...pkg, excursions: [...pkg.excursions, ...newExcursions] }
        : pkg
    ));

    resetExcursionForm();
  };

  const handleAddTourService = () => {
    if (!selectedPackage || selectedTourServices.length === 0) return;

    const newServices: TourService[] = selectedTourServices.map(name => ({
      id: Date.now().toString() + Math.random(),
      name
    }));

    setPackages(prev => prev.map(pkg => 
      pkg.id === selectedPackage.id 
        ? { ...pkg, tourServices: [...pkg.tourServices, ...newServices] }
        : pkg
    ));

    resetServiceForm();
  };

  const openServicesDialog = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowServicesDialog(true);
  };

  const summaryBodyTemplate = (rowData: Package) => {
    const excursionNames = rowData.excursions.map(e => e.name).join(', ');
    const serviceNames = rowData.tourServices.map(s => s.name).join(', ');
    
    return (
      <div className="text-sm">
        {excursionNames && <div><strong>Excursions:</strong> {excursionNames}</div>}
        {serviceNames && <div><strong>Services:</strong> {serviceNames}</div>}
      </div>
    );
  };

  const countsBodyTemplate = (rowData: Package) => {
    return (
      <div className="flex gap-2">
        <Badge value={rowData.hotels.length} className="p-badge-info" />
        <span className="text-sm">Hotels</span>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: Package) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-info"
          tooltip="Edit"
          onClick={() => handleEditPackage(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          tooltip="Delete"
          onClick={() => handleDeletePackage(rowData)}
        />
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-text p-button-success"
          tooltip="Add Services"
          onClick={() => openServicesDialog(rowData)}
        />
      </div>
    );
  };

  const rowExpansionTemplate = (data: Package) => {
    return (
      <div className="p-4">
        <div className="grid">
          {/* Hotels Section */}
          <div className="col-12 md:col-4">
            <h5>Hotels ({data.hotels.length})</h5>
            {data.hotels.map((hotel) => (
              <div key={hotel.id} className="p-3 border-1 border-round mb-2 surface-border">
                <div className="font-bold">{hotel.hotel}</div>
                <div className="text-sm text-500">{hotel.roomType} Room</div>
              </div>
            ))}
          </div>

          {/* Excursions Section */}
          <div className="col-12 md:col-4">
            <h5>Excursions ({data.excursions.length})</h5>
            {data.excursions.map((excursion) => (
              <div key={excursion.id} className="p-3 border-1 border-round mb-2 surface-border">
                <div className="font-bold">{excursion.name}</div>
              </div>
            ))}
          </div>

          {/* Tour Services Section */}
          <div className="col-12 md:col-4">
            <h5>Tour Services ({data.tourServices.length})</h5>
            {data.tourServices.map((service) => (
              <div key={service.id} className="p-3 border-1 border-round mb-2 surface-border">
                <div className="font-bold">{service.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <Toast />
      <ConfirmDialog />
      
      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="text-3xl font-bold">Package Management</h2>
        <Button 
          label="Add New Package" 
          icon="pi pi-plus" 
          onClick={() => setShowPackageDialog(true)}
          className="p-button-success"
        />
      </div>

      <DataTable 
        value={packages} 
        reorderableRows 
        onRowReorder={(e) => setPackages(e.value)}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        className="p-datatable-striped"
      >
        <Column rowReorder style={{width: '3em'}} />
        <Column expander style={{width: '3em'}} />
        <Column field="city" header="City" />
        <Column field="nights" header="Nights" />
        <Column 
          header="Summary" 
          body={summaryBodyTemplate}
          style={{minWidth: '200px'}}
        />
        <Column 
          header="Hotels" 
          body={countsBodyTemplate}
          style={{minWidth: '100px'}}
        />
        <Column 
          header="Actions" 
          body={actionsBodyTemplate}
          style={{minWidth: '150px'}}
        />
      </DataTable>

      {/* Add/Edit Package Dialog */}
      <Dialog 
        header={editingPackage ? "Edit Package" : "Add New Package"} 
        visible={showPackageDialog} 
        style={{width: '50vw'}} 
        onHide={() => {
          setShowPackageDialog(false);
          resetForm();
          setEditingPackage(false);
          setSelectedPackage(null);
        }}
      >
        <div className="grid p-fluid">
          <div className="col-12">
            <label className="block text-900 font-medium mb-2">Number of Nights</label>
            <InputText 
              value={nights.toString()} 
              onChange={(e) => setNights(parseInt(e.target.value) || 1)}
              placeholder="Enter number of nights"
              keyfilter="pint"
            />
          </div>
          <div className="col-12">
            <label className="block text-900 font-medium mb-2">City</label>
            <Dropdown 
              value={selectedCity} 
              options={cities} 
              onChange={(e) => setSelectedCity(e.value)}
              placeholder="Select a city"
            />
          </div>
        </div>
        <div className="flex justify-content-end gap-2 mt-4">
          <Button 
            label="Cancel" 
            icon="pi pi-times" 
            className="p-button-text" 
            onClick={() => {
              setShowPackageDialog(false);
              resetForm();
              setEditingPackage(false);
              setSelectedPackage(null);
            }}
          />
          <Button 
            label={editingPackage ? "Update" : "Add"} 
            icon="pi pi-check" 
            onClick={handleAddPackage}
          />
        </div>
      </Dialog>

      {/* Add Services Dialog */}
      <Dialog 
        header="Add Services" 
        visible={showServicesDialog} 
        style={{width: '60vw'}} 
        onHide={() => {
          setShowServicesDialog(false);
          resetHotelForm();
          resetExcursionForm();
          resetServiceForm();
        }}
      >
        <div className="p-fluid">
          {/* Hotels Section */}
          <div className="mb-4">
            <h4>Add Hotels</h4>
            <div className="grid">
              <div className="col-6">
                <label className="block text-900 font-medium mb-2">Hotel</label>
                <Dropdown 
                  value={selectedHotel} 
                  options={hotels}
                  onChange={(e) => setSelectedHotel(e.value)}
                  placeholder="Select hotel"
                />
              </div>
              <div className="col-4">
                <label className="block text-900 font-medium mb-2">Room Type</label>
                <Dropdown 
                  value={selectedRoomType} 
                  options={roomTypes}
                  onChange={(e) => setSelectedRoomType(e.value)}
                  placeholder="Select room type"
                />
              </div>
              <div className="col-2 flex align-items-end">
                <Button 
                  label="Add Hotel" 
                  icon="pi pi-plus" 
                  onClick={handleAddHotel}
                  className="p-button-sm"
                />
              </div>
            </div>
          </div>

          {/* Excursions Section */}
          <div className="mb-4">
            <h4>Add Excursions</h4>
            <div className="grid">
              <div className="col-10">
                <label className="block text-900 font-medium mb-2">Excursions</label>
                <Dropdown 
                  value={selectedExcursions} 
                  options={excursions}
                  onChange={(e) => setSelectedExcursions(e.value)}
                  placeholder="Select excursions"
                  multiple
                />
              </div>
              <div className="col-2 flex align-items-end">
                <Button 
                  label="Add" 
                  icon="pi pi-plus" 
                  onClick={handleAddExcursion}
                  className="p-button-sm"
                />
              </div>
            </div>
          </div>

          {/* Tour Services Section */}
          <div className="mb-4">
            <h4>Add Tour Services</h4>
            <div className="grid">
              <div className="col-10">
                <label className="block text-900 font-medium mb-2">Tour Services</label>
                <Dropdown 
                  value={selectedTourServices} 
                  options={tourServices}
                  onChange={(e) => setSelectedTourServices(e.value)}
                  placeholder="Select tour services"
                  multiple
                />
              </div>
              <div className="col-2 flex align-items-end">
                <Button 
                  label="Add" 
                  icon="pi pi-plus" 
                  onClick={handleAddTourService}
                  className="p-button-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-content-end mt-4">
          <Button 
            label="Close" 
            icon="pi pi-times" 
            className="p-button-text" 
            onClick={() => {
              setShowServicesDialog(false);
              resetHotelForm();
              resetExcursionForm();
              resetServiceForm();
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PackageManager;