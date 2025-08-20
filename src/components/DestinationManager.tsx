import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Toast } from "primereact/toast";
import React, { useState } from "react";
import { Destination, Hotel } from "../types/Package";

const DestinationManager: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: "1",
      nights: 6,
      city: "Paris",
      hotels: [
        {
          id: "1",
          name: "Hotel Luxury",
          roomTypes: [
            { id: "1", name: "Double" },
            { id: "2", name: "Suite" },
          ],
        },
        {
          id: "2",
          name: "Budget Inn",
          roomTypes: [{ id: "3", name: "Single" }],
        },
      ],
      excursions: [
        { id: "1", name: "Eiffel Tower Tour" },
        { id: "2", name: "Louvre Museum" },
      ],
      tourServices: [
        { id: "1", name: "Airport Transfer" },
        { id: "2", name: "City Guide" },
      ],
    },
  ]);
  const [showDestinationDialog, setShowDestinationDialog] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [editingDestination, setEditingDestination] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  // Form states
  const [nights, setNights] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedExcursions, setSelectedExcursions] = useState<string[]>([]);
  const [selectedTourServices, setSelectedTourServices] = useState<string[]>(
    []
  );

  // Hotel form states
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

  const cities = [
    { label: "Paris", value: "Paris" },
    { label: "London", value: "London" },
    { label: "Rome", value: "Rome" },
    { label: "Barcelona", value: "Barcelona" },
    { label: "Amsterdam", value: "Amsterdam" },
  ];

  const hotels = [
    {
      label: "Hotel Luxury",
      value: "Hotel Luxury",
      roomTypes: [
        { label: "Single", value: "Single" },
        { label: "Double", value: "Double" },
        { label: "Suite", value: "Suite" },
      ],
    },
    {
      label: "Budget Inn",
      value: "Budget Inn",
      roomTypes: [
        { label: "Single", value: "Single" },
        { label: "Double", value: "Double" },
      ],
    },
    {
      label: "Grand Palace",
      value: "Grand Palace",
      roomTypes: [
        { label: "Deluxe", value: "Deluxe" },
        { label: "Presidential", value: "Presidential" },
      ],
    },
    {
      label: "City Center Hotel",
      value: "City Center Hotel",
      roomTypes: [
        { label: "Standard", value: "Standard" },
        { label: "Superior", value: "Superior" },
      ],
    },
  ];

  const excursions = [
    { label: "Eiffel Tower Tour", value: "Eiffel Tower Tour" },
    { label: "Louvre Museum", value: "Louvre Museum" },
    { label: "Seine River Cruise", value: "Seine River Cruise" },
    { label: "Versailles Palace", value: "Versailles Palace" },
    { label: "Montmartre Walking Tour", value: "Montmartre Walking Tour" },
  ];

  const tourServices = [
    { label: "Airport Transfer", value: "Airport Transfer" },
    { label: "City Guide", value: "City Guide" },
    { label: "Car Rental", value: "Car Rental" },
    { label: "Travel Insurance", value: "Travel Insurance" },
    { label: "WiFi Device", value: "WiFi Device" },
  ];

  const resetForm = () => {
    setNights(1);
    setSelectedCity("");
    setSelectedExcursions([]);
    setSelectedTourServices([]);
    setSelectedHotel("");
    setSelectedRoomTypes([]);
  };

  const handleAddDestination = () => {
    if (!nights || !selectedCity) return;

    const newDestination: Destination = {
      id: Date.now().toString(),
      nights,
      city: selectedCity,
      hotels: [],
      excursions: selectedExcursions.map((name) => ({
        id: Date.now().toString() + Math.random(),
        name,
      })),
      tourServices: selectedTourServices.map((name) => ({
        id: Date.now().toString() + Math.random(),
        name,
      })),
    };

    if (editingDestination && selectedDestination) {
      setDestinations((prev) =>
        prev.map((dest) =>
          dest.id === selectedDestination.id
            ? { ...selectedDestination, nights, city: selectedCity }
            : dest
        )
      );
    } else {
      setDestinations((prev) => [...prev, newDestination]);
    }

    setShowDestinationDialog(false);
    resetForm();
    setEditingDestination(false);
    setSelectedDestination(null);
  };

  const handleEditDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setNights(dest.nights);
    setSelectedCity(dest.city);
    setSelectedExcursions(dest.excursions.map((e) => e.name));
    setSelectedTourServices(dest.tourServices.map((s) => s.name));
    setEditingDestination(true);
    setShowDestinationDialog(true);
  };

  const handleDeleteDestination = (dest: Destination) => {
    confirmDialog({
      message: "Are you sure you want to delete this destination?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        setDestinations((prev) => prev.filter((d) => d.id !== dest.id));
      },
    });
  };

  const handleAddHotel = () => {
    if (
      !selectedDestination ||
      !selectedHotel ||
      selectedRoomTypes.length === 0
    )
      return;

    const newHotel: Hotel = {
      id: Date.now().toString(),
      name: selectedHotel,
      roomTypes: selectedRoomTypes.map((roomType) => ({
        id: Date.now().toString() + Math.random(),
        name: roomType,
      })),
    };

    setDestinations((prev) =>
      prev.map((dest) =>
        dest.id === selectedDestination.id
          ? { ...dest, hotels: [...dest.hotels, newHotel] }
          : dest
      )
    );

    setSelectedHotel("");
    setSelectedRoomTypes([]);
  };

  const handleRemoveHotel = (hotelId: string) => {
    if (!selectedDestination) return;

    setDestinations((prev) =>
      prev.map((dest) =>
        dest.id === selectedDestination.id
          ? {
              ...dest,
              hotels: dest.hotels.filter((hotel) => hotel.id !== hotelId),
            }
          : dest
      )
    );
  };

  const handleRemoveRoomType = (hotelId: string, roomTypeId: string) => {
    if (!selectedDestination) return;

    setDestinations((prev) =>
      prev.map((dest) =>
        dest.id === selectedDestination.id
          ? {
              ...dest,
              hotels: dest.hotels.map((hotel) =>
                hotel.id === hotelId
                  ? {
                      ...hotel,
                      roomTypes: hotel.roomTypes.filter(
                        (rt) => rt.id !== roomTypeId
                      ),
                    }
                  : hotel
              ),
            }
          : dest
      )
    );
  };

  const getAvailableRoomTypes = () => {
    const selectedHotelData = hotels.find((h) => h.value === selectedHotel);
    return selectedHotelData ? selectedHotelData.roomTypes : [];
  };

  const summaryBodyTemplate = (rowData: Destination) => {
    const excursionNames = rowData.excursions.map((e) => e.name).join(", ");
    const serviceNames = rowData.tourServices.map((s) => s.name).join(", ");

    // Format hotel and room type information
    const hotelInfo = rowData.hotels
      .map((hotel) => {
        const roomTypes = hotel.roomTypes.map((rt) => rt.name).join(", ");
        return `${hotel.name}${roomTypes ? ` (${roomTypes})` : ""}`;
      })
      .join("; ");

    return (
      <div className="text-sm space-y-2">
        <div>
          <strong>City:</strong> {rowData.city}
        </div>
        <div>
          <strong>Nights:</strong> {rowData.nights}
        </div>
        {hotelInfo && (
          <div>
            <strong>Hotels:</strong> {hotelInfo}
          </div>
        )}
        {excursionNames && (
          <div>
            <strong>Excursions:</strong> {excursionNames}
          </div>
        )}
        {serviceNames && (
          <div>
            <strong>Services:</strong> {serviceNames}
          </div>
        )}
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: Destination) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-info"
          tooltip="Edit"
          onClick={() => handleEditDestination(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          tooltip="Delete"
          onClick={() => handleDeleteDestination(rowData)}
        />
      </div>
    );
  };

  return (
    <div className="p-6">
      <Toast />
      <ConfirmDialog />

      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="text-3xl font-bold">Destination Management</h2>
        <Button
          label="Add New Destination"
          icon="pi pi-plus"
          onClick={() => setShowDestinationDialog(true)}
          className="p-button-success"
        />
      </div>

      <DataTable
        value={destinations}
        reorderableRows
        onRowReorder={(e) => setDestinations(e.value)}
        dataKey="id"
        className="p-datatable-striped"
      >
        <Column rowReorder style={{ width: "3em" }} />
        <Column field="city" header="City" />
        <Column field="nights" header="Nights" />
        <Column
          header="Summary"
          body={summaryBodyTemplate}
          style={{ minWidth: "300px" }}
        />
        <Column
          header="Actions"
          body={actionsBodyTemplate}
          style={{ minWidth: "150px" }}
        />
      </DataTable>

      {/* Add/Edit Destination Dialog */}
      <Dialog
        header={editingDestination ? "Edit Destination" : "Add New Destination"}
        visible={showDestinationDialog}
        style={{ width: "60vw" }}
        onHide={() => {
          setShowDestinationDialog(false);
          resetForm();
          setEditingDestination(false);
          setSelectedDestination(null);
        }}
      >
        <div className="grid p-fluid">
          <div className="col-12 md:col-6">
            <label className="block text-900 font-medium mb-2">
              Number of Nights
            </label>
            <InputText
              value={nights.toString()}
              onChange={(e) => setNights(parseInt(e.target.value) || 1)}
              placeholder="Enter number of nights"
              keyfilter="pint"
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block text-900 font-medium mb-2">City</label>
            <Dropdown
              value={selectedCity}
              options={cities}
              onChange={(e) => setSelectedCity(e.value)}
              placeholder="Select a city"
            />
          </div>

          {/* Excursions Section */}
          <div className="col-12">
            <label className="block text-900 font-medium mb-2">
              Excursions
            </label>
            <MultiSelect
              value={selectedExcursions}
              options={excursions}
              onChange={(e) => setSelectedExcursions(e.value)}
              placeholder="Select excursions"
              display="chip"
              className="w-full"
            />
          </div>

          {/* Tour Services Section */}
          <div className="col-12">
            <label className="block text-900 font-medium mb-2">
              Tour Services
            </label>
            <MultiSelect
              value={selectedTourServices}
              options={tourServices}
              onChange={(e) => setSelectedTourServices(e.value)}
              placeholder="Select tour services"
              display="chip"
              className="w-full"
            />
          </div>

          {/* Hotels Section */}
          <div className="col-12">
            <h4 className="mt-4">Hotels</h4>

            {/* Existing Hotels */}
            {selectedDestination?.hotels &&
              selectedDestination.hotels.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-900 font-medium mb-2">
                    Existing Hotels:
                  </h5>
                  {selectedDestination.hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="p-3 border-round border-1 surface-border mb-2"
                    >
                      <div className="flex justify-content-between align-items-center mb-2">
                        <span className="font-medium">{hotel.name}</span>
                        <Button
                          icon="pi pi-trash"
                          className="p-button-rounded p-button-text p-button-danger p-button-sm"
                          tooltip="Remove Hotel"
                          onClick={() => handleRemoveHotel(hotel.id)}
                        />
                      </div>
                      {hotel.roomTypes.length > 0 && (
                        <div className="ml-3">
                          <h6 className="text-600 text-sm mb-1">Room Types:</h6>
                          {hotel.roomTypes.map((roomType) => (
                            <div
                              key={roomType.id}
                              className="flex justify-content-between align-items-center mb-1"
                            >
                              <span className="text-sm">{roomType.name}</span>
                              <Button
                                icon="pi pi-times"
                                className="p-button-rounded p-button-text p-button-secondary p-button-sm"
                                tooltip="Remove Room Type"
                                onClick={() =>
                                  handleRemoveRoomType(hotel.id, roomType.id)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {/* Add New Hotel */}
            <h5 className="text-900 font-medium mb-2">Add New Hotel:</h5>
            <div className="grid">
              <div className="col-12 md:col-5">
                <label className="block text-900 font-medium mb-2">Hotel</label>
                <Dropdown
                  value={selectedHotel}
                  options={hotels.map((h) => ({
                    label: h.label,
                    value: h.value,
                  }))}
                  onChange={(e) => {
                    setSelectedHotel(e.value);
                    setSelectedRoomTypes([]);
                  }}
                  placeholder="Select hotel"
                />
              </div>
              <div className="col-12 md:col-5">
                <label className="block text-900 font-medium mb-2">
                  Room Types
                </label>
                <MultiSelect
                  value={selectedRoomTypes}
                  options={getAvailableRoomTypes()}
                  onChange={(e) => setSelectedRoomTypes(e.value)}
                  placeholder="Select room types"
                  disabled={!selectedHotel}
                  display="chip"
                />
              </div>
              <div className="col-12 md:col-2 flex align-items-end">
                <Button
                  label="Add Hotel"
                  icon="pi pi-plus"
                  onClick={handleAddHotel}
                  className="p-button-sm w-full"
                  disabled={!selectedHotel || selectedRoomTypes.length === 0}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => {
              setShowDestinationDialog(false);
              resetForm();
              setEditingDestination(false);
              setSelectedDestination(null);
            }}
          />
          <Button
            label={editingDestination ? "Update" : "Add"}
            icon="pi pi-check"
            onClick={handleAddDestination}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default DestinationManager;
