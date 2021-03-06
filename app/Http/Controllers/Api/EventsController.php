<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Event;

class EventsController extends Controller
{
    /**
     * Save event to database.
     *
     * @return Json
     */
    public function saveEvent(EventRequest $request)
    {
        DB::beginTransaction();

        try {
            $event = new Event();
            $event->event = $request->event;
            $event->date_from = date('Y-m-d', strtotime($request->dateFrom));
            $event->date_to = date('Y-m-d', strtotime($request->dateTo));
            $event->days = $request->checkedDays;

            if ($event->save()) {
                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Event successfully saved'
                ], 200);
            }
        } catch (QueryException $queryEx) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $queryEx->getMessage()
            ], 500);
        } catch (\Exception $ex) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $ex->getMessage()
            ], 500);
        }

        return $validated;
    }
}
